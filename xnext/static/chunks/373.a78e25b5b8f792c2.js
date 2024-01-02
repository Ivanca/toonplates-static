!function(){"use strict";var e,r;let t;let a="https://unpkg.com/@ffmpeg/core@0.12.5/dist/umd/toonplates-static/ffmpeg-core.js";(r=e||(e={})).LOAD="LOAD",r.EXEC="EXEC",r.WRITE_FILE="WRITE_FILE",r.READ_FILE="READ_FILE",r.DELETE_FILE="DELETE_FILE",r.RENAME="RENAME",r.CREATE_DIR="CREATE_DIR",r.LIST_DIR="LIST_DIR",r.DELETE_DIR="DELETE_DIR",r.ERROR="ERROR",r.DOWNLOAD="DOWNLOAD",r.PROGRESS="PROGRESS",r.LOG="LOG",r.MOUNT="MOUNT",r.UNMOUNT="UNMOUNT";let s=Error("unknown message type"),E=Error("ffmpeg is not loaded, call `await ffmpeg.load()` first");Error("called FFmpeg.terminate()");let o=Error("failed to import ffmpeg-core.js"),l=async({coreURL:r,wasmURL:s,workerURL:E})=>{let l=!t;try{r||(r=a),importScripts(r)}catch{if(r||(r=a.replace("/umd/","/esm/")),self.createFFmpegCore=(await import(r)).default,!self.createFFmpegCore)throw o}let R=r,c=s||r.replace(/.js$/g,".wasm"),i=E||r.replace(/.js$/g,".worker.js");return(t=await self.createFFmpegCore({mainScriptUrlOrBlob:`${R}#${btoa(JSON.stringify({wasmURL:c,workerURL:i}))}`})).setLogger(r=>self.postMessage({type:e.LOG,data:r})),t.setProgress(r=>self.postMessage({type:e.PROGRESS,data:r})),l},R=({args:e,timeout:r=-1})=>{t.setTimeout(r),t.exec(...e);let a=t.ret;return t.reset(),a},c=({path:e,data:r})=>(t.FS.writeFile(e,r),!0),i=({path:e,encoding:r})=>t.FS.readFile(e,{encoding:r}),f=({path:e})=>(t.FS.unlink(e),!0),F=({oldPath:e,newPath:r})=>(t.FS.rename(e,r),!0),L=({path:e})=>(t.FS.mkdir(e),!0),m=({path:e})=>{let r=t.FS.readdir(e),a=[];for(let s of r){let r=t.FS.stat(`${e}/${s}`),E=t.FS.isDir(r.mode);a.push({name:s,isDir:E})}return a},p=({path:e})=>(t.FS.rmdir(e),!0),n=({fsType:e,options:r,mountPoint:a})=>{let s=t.FS.filesystems[e];return!!s&&(t.FS.mount(s,r,a),!0)},D=({mountPoint:e})=>(t.FS.unmount(e),!0);self.onmessage=async({data:{id:r,type:a,data:o}})=>{let O;let S=[];try{if(a!==e.LOAD&&!t)throw E;switch(a){case e.LOAD:O=await l(o);break;case e.EXEC:O=R(o);break;case e.WRITE_FILE:O=c(o);break;case e.READ_FILE:O=i(o);break;case e.DELETE_FILE:O=f(o);break;case e.RENAME:O=F(o);break;case e.CREATE_DIR:O=L(o);break;case e.LIST_DIR:O=m(o);break;case e.DELETE_DIR:O=p(o);break;case e.MOUNT:O=n(o);break;case e.UNMOUNT:O=D(o);break;default:throw s}}catch(t){self.postMessage({id:r,type:e.ERROR,data:t.toString()});return}O instanceof Uint8Array&&S.push(O.buffer),self.postMessage({id:r,type:a,data:O},S)}}(),_N_E={};