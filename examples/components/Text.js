import React from 'react'
import { StyleSheet } from 'elementum'

const styles = StyleSheet.create({
  self: {
    fontSize: '18px',
  },
  red: {
    color: 'red',
  },
  large: {
    fontSize: '28px',
  },
})

const Text = ({ red, large, children }) => (
  <div className={styles({ red, large })}>
    {children}
  </div>
)

export default Text
