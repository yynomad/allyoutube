import ytdl, { videoInfo } from 'ytdl-core';

// 格式化观看次数（例如：转换为“万”或“亿”）
function formatViewCount(count: string): string {
  const num = parseInt(count);
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿';
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString();
}

// 尝试从 YouTube URL 提取视频ID
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/(?:embed|v|shorts)\/([^&\n?#]+)/,
    /youtu\.be\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// 获取视频信息并返回相关数据
async function getVideoInfo(url: string) {
  const videoId = extractVideoId(url);
  if (!videoId) {
    throw new Error('无法从给定 URL 提取视频ID');
  }

  const standardUrl = `https://www.youtube.com/watch?v=${videoId}`;
  try {
    const info: videoInfo = await ytdl.getInfo(standardUrl);

    const formats = info.formats.map(format => ({
      quality: format.qualityLabel,
      mimeType: format.mimeType?.split(';')[0],
      url: format.url,
      hasAudio: format.hasAudio,
      hasVideo: format.hasVideo,
    }));

    return {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
      duration: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
      uploadDate: new Date(info.videoDetails.uploadDate).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      viewCount: formatViewCount(info.videoDetails.viewCount),
      formats: formats.filter(f => f.hasVideo || (!f.hasVideo && f.hasAudio)),
    };
  } catch (error) {
    throw new Error('无法获取视频信息: ' + error.message);
  }
}

// 示例：如何调用这个函数
const videoUrl = 'https://www.youtube.com/watch?v=26PrgjTboVQ'; // 使用实际的 URL

getVideoInfo(videoUrl)
  .then((info) => {
    console.log('视频信息:', info);
    console.log('视频信息:', info.formats);
    console.log('视频信息:', info.formats[0].url);
    console.log('视频信息:', info.formats[0].mimeType);
    console.log('视频信息:', info.formats[0].hasAudio);
    console.log('视频信息:', info.formats[0].hasVideo);
    console.log('视频信息:', info.formats[0].quality);
  })
  .catch((error) => {
    console.error('获取视频信息时出错:', error.message);
  });
