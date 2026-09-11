import { requestUrl } from 'obsidian';
import { dailyNotesService } from '../../services';

const cachedResourceMap = new Map<string, string>();

const convertResourceToDataURL = async (url: string, useCache = true): Promise<string> => {
  const { vault } = dailyNotesService.getState().app;

  if (useCache && cachedResourceMap.has(url)) {
    return Promise.resolve(cachedResourceMap.get(url));
  }

  // let res;

  if (!/(http|https)/g.test(url)) {
    if (await vault.adapter.exists(url)) {
      const buffer = await vault.adapter.readBinary(url);
      const arr = new Uint8Array(buffer);

      const blob = new Blob([arr], { type: 'image/png' });
      // var len = arr.byteLength;
      // for (var i = 0; i < len; i++) {
      //     binary += String.fromCharCode( arr[ i ] );
      // }

      // return window.btoa( binary );
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Url = reader.result as string;
          cachedResourceMap.set(url, base64Url);
          resolve(base64Url);
        };
        reader.readAsDataURL(blob);
      });
    }
  } else {
    try {
      // getBase64Image(url);
      const buffer = (await downloadFile(url)).buffer;
      // const download = await request({
      //   method: 'GET',
      //   url: url,
      //   contentType: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      //   // headers: {
      //   //   "Content-Type": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      //   //   Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      //   //   "Proxy-Connection": "keep-alive",
      //   //   Pragma: "no-cache",
      //   //   "Cache-Control": "no-cache",
      //   //   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) obsidian/0.12.19 Chrome/91.0.4472.164 Electron/13.5.2 Safari/537.36",
      //   // },
      // });

      // const enc = new TextEncoder().encode(download); // always utf-8
      // const bf = enc;
      const blob = new Blob([buffer], { type: 'image/png' });
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Url = reader.result as string;
          cachedResourceMap.set(url, base64Url);
          resolve(base64Url);
        };
        reader.readAsDataURL(blob);
      });
      // return ((download === "Not Found" || download === `{"error":"Not Found"}`) ? null : download);
    } catch (error) {
      console.error('convertResourceToDataURL failed:', url, error);
    }
  }
};

// const getBase64Image = (img: any) => {

//   img.crossOrigin = '';

//   var canvas = document.createElement("canvas");
//   canvas.width = img.width;
//   canvas.height = img.height;

//   var ctx = canvas.getContext("2d");
//   ctx.drawImage(img, 0, 0);

//   var dataURL = canvas.toDataURL("image/png");

//   console.log(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));

//   return 0;
// }

const downloadFile = async (url: string) => {
  // 用内核 requestUrl（社区审查要求，替代 fetch）：不受 CORS 限制，
  // 而原 fetch(no-cors) 拿到的是 opaque 响应（status 恒 0），外链图其实一直取不到
  try {
    const response = await requestUrl({ url });
    if (response.status !== 200) {
      return {
        ok: false,
        msg: String(response.status),
      };
    }
    return {
      ok: true,
      msg: 'ok',
      buffer: response.arrayBuffer,
    };
  } catch (err) {
    return {
      ok: false,
      msg: err,
    };
  }
};

export default convertResourceToDataURL;
