export const downloadString = (lines)=>{
    let arr = lines.split('\n');
    arr = arr.map(line=>line+'\n')
    const objFile=new File(arr,'demo.md')
    const url = URL.createObjectURL(objFile)
    fetch(url).then(res => res.blob()).then(blob => {
        const a = document.createElement('a');
        document.body.appendChild(a)
        a.style.display = 'none'
        // 使用获取到的blob对象创建的url
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        // 指定下载的文件名
        a.download = 'demo.md';
        a.click();
        document.body.removeChild(a)
        // 移除blob对象的url
        window.URL.revokeObjectURL(url);
      });
}