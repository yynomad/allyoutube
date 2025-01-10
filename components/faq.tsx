export function FAQ() {
  return (
    <div>      
      <div className="space-y-4">
        <div>
          <h3 className="font-bold mb-2">怎么下载？</h3>
          <p className="bg-blue-50 p-4 rounded">
            在新打开的页面上，点击右下角的三个小点，然后选择下载
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Android手机上可以用吗？</h3>
          <p className="bg-blue-50 p-4 rounded">
            可以的，Android手机在常用的Chrome、UC、360、QQ等浏览器上都可以很方便的使用本站。推荐使用Chrome浏览器获得最佳下载体验。
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-2">iOS设备（iPhone、iPad、iPod）上点击下载视频按钮后，就转到视频页面，并没有直接下载，怎么办？</h3>
          <p className="bg-blue-50 p-4 rounded">
            因Safari及微信内置浏览器均不支持下载文件，所以保存视频需要借助第三方App来完成下载。建议iOS用户在App Store下载免费的Documents 6，然后在Documents内的自带浏览器中使用本站，可以完美下载视频，并且Documents支持将下载的视频移到手机相册，参考：iPhone上利用Documents下载和管理视频教程
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-2">下载后的视频打不开怎么办？</h3>
          <p className="bg-blue-50 p-4 rounded">
            这种情况极少发生，一般是文件后缀名错误，把下载后的文件后缀名改为.mp4即可播放。
          </p>
        </div>
      </div>
    </div>
  )
}

