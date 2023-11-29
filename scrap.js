// const computedPath = computed(() => {
  //   if (svgPathData.value) {
  //     if (props.breakpointsX.length) {
  //       const commands = CloneDeep(svgPathData.value.commands)
  //       for (let i = 0; i < props.breakpointsX.length; i = i + 2) {
  //         const start = props.breakpointsX[i]
  //         const end = props.breakpointsX[i + 1]
  //         const dif = end - start
  //         commands.forEach((item) => {
  //           const xCoords = Object.keys(item).filter(key => key.startsWith('x'))
  //           xCoords.forEach((key) => {
  //             if (item[key] > start) {
  //               item[key] = item[key] - dif
  //             }
  //           })
  //         })
  //         // const intersections = commands.filter(item => {
  //         //   const xCoords = Object.keys(item).filter(key => key.startsWith('x')).map(key => item[key])
  //         //   return xCoords.some(val => val >= start && val <= end) || (Math.min(...xCoords) <= start && Math.max(...xCoords) >= end)
  //         // })
  //         // intersections.forEach(line => {
  //         //   if (line.x > start) {
  //         //     line.x = start
  //         //   }
  //         // })
  //       }
  
  //       let recompiled = ''
  //       for (let i = 0; i < commands.length; i++) {
  //         const cmd = commands[i]
  //         const coords = [cmd.x, cmd.y]
  //         if (cmd.x1 && cmd.y1) { coords.push(cmd.x1, cmd.y1) }
  //         if (cmd.x2 && cmd.y2) { coords.push(cmd.x2, cmd.y2) }
  //         recompiled = recompiled + `${cmd.code} ` + coords.join(' ') + ' '
  //       }
  //       console.log('recompiled')
  //       console.log(recompiled)
  //       return recompiled
  //     } else {
  //       return svgPathData.value.path
  //     }
  //   }
  //   return false
  // })
  
  // watch(computedPath, (val) => {
  //   console.log(val)
  // })