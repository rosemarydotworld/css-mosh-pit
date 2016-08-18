class Pit {
  transformCSS(styles) { 
    return this.cleanPseudoContent(this.cleanUrl(this.cleanWildcards(styles)))
  }
  
  cleanPseudoContent(styles) {
    const contentRegex = new RegExp('content:.+', 'im')

    return styles.replace(contentRegex, "/* nope */")
  }

  cleanUrl(styles) {
    const urlRegex = new RegExp('url\s*\((.+)\)', 'im')

    return styles.replace(urlRegex, "/* heck nope */")
  }

  cleanWildcards(styles) {
    const wildcardRegex = new RegExp('.*\\*.*{', 'im')

    return styles.replace(wildcardRegex, "/* nah */")
  }
}

window.onload = () => {
  // Initialize Firebase
  const firepadRef = new Firebase('https://css-mosh-pit.firebaseio.com/')

  // Create ACE
  const editor = ace.edit("the-pit")
  editor.setTheme("ace/theme/solarized_dark")

  // Configure editor
  const session = editor.getSession()
  session.setTabSize(2)
  session.setUseSoftTabs(true)
  session.setUseWrapMode(true)
  session.setUseWorker(false)
  session.setMode("ace/mode/css")

  // Create Firepad to sync the whole thing
  const firepad = Firepad.fromACE(firepadRef, editor, {})

  const pit = new Pit();

  // On sync, do some transformations
  firepad.on('synced', isSynced => {
    if(!isSynced) {
      const styles = firepad.getText()
      const preparedStyles = pit.transformCSS(styles)

      if(preparedStyles != styles) {
        firepad.setText(preparedStyles)
      }
    }
  })
}
