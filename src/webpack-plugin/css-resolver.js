const CSSResolver = {
  apply: function apply(resolver) {
    resolver.plugin('file', function file(request, callback) {
      if (this.join(request.path, request.request).indexOf('/cssfs') === 0) {
        return this.doResolve('result', {
          path: this.join(request.path, request.request),
          query: request.query,
          file: true,
          resolved: true,
        }, callback)
      }

      callback()
    })
  },
}

export default CSSResolver
