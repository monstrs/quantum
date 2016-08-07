import { join, isAbsolute } from 'path'
import { getModClassName, getClassNameFromPath } from '../utils/className'

const STYLES_COMMENT_ID = 'ELEMENTUM_STYLES_COMMENT'
const EXTRACTED_STYLES_VAR = 'ELEMENTUM_EXTRACTED_STYLES'

export function hasStyles(code) {
  return code.indexOf(STYLES_COMMENT_ID) !== -1
}

export function extractStyles(code) {
  const parts = code.split(`//${STYLES_COMMENT_ID}`)

  return (parts[1] || '').substr(1).replace(`var ${EXTRACTED_STYLES_VAR} = `, '')
}

export function getFileRootPath(configPath = '') {
  if (configPath && isAbsolute(configPath)) {
    return configPath
  }

  return join(process.cwd(), configPath)
}

export default function ({ types: t }) {
  return {
    visitor: {
      Program: {
        enter(path, state) {
          this.extractedStyles = []
          this.fileRootPath = getFileRootPath(state.opts.rootPath)
        },
        exit(path) {
          if (this.extractedStyles.length === 0) {
            return
          }

          const styles = t.variableDeclaration('var', [
            t.variableDeclarator(
              t.identifier(EXTRACTED_STYLES_VAR),
              t.objectExpression(this.extractedStyles)
            ),
          ])

          styles.leadingComments = [{
            type: 'CommentLine',
            value: STYLES_COMMENT_ID,
          }]

          styles.trailingComments = [{
            type: 'CommentLine',
            value: STYLES_COMMENT_ID,
          }]

          path.node.body.push(styles)
        },
      },
      ModuleDeclaration({ node }) {
        if (!(node.source && node.source.value === 'elementum')) return

        const specifiers = node.specifiers.filter(item => item.imported.name === 'StyleSheet')

        if (specifiers.length === 0) return

        this.localImportName = specifiers[0].local.name
      },
      CallExpression(path) {
        const { node, hub } = path

        if (!this.localImportName) return
        if (!t.isMemberExpression(node.callee)) return
        if (this.localImportName !== node.callee.object.name) return

        if (node.callee.property.name === 'create') {
          const filename = getFileRootPath(hub.file.opts.filename)

          const className = getClassNameFromPath(filename, this.fileRootPath)
          const properties = node.arguments[0].properties

          const { classMap, styles } = properties.reduce((result, { key, value }) => {
            result.classMap.push(
              t.objectProperty(
                t.stringLiteral(key.name || key.value),
                t.stringLiteral(getModClassName(className, key.name || key.value))
              )
            )

            result.styles.push(
              t.objectProperty(
                t.stringLiteral(`.${getModClassName(className, key.name || key.value)}`),
                value
              )
            )

            return result
          }, { classMap: [], styles: [] })

          this.extractedStyles = this.extractedStyles.concat(styles)

          path.replaceWith(
            t.callExpression(
              t.memberExpression(t.identifier('StyleSheet'), t.identifier('createClassMap')),
              [t.objectExpression(classMap)]
            )
          )
        }
      },
    },
  }
}
