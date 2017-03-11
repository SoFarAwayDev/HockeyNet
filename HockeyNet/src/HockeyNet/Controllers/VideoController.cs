using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.IO;
using HockeyNet.Helpers;
using Microsoft.Extensions.Options;
using HockeyNet.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HockeyNet.Controllers
{
    [Route("api")]
    public class VideoController : Controller
    {
        private readonly CommonSettings _commonSettings;

        public VideoController(IOptions<CommonSettings> commonSettings)
        {
            _commonSettings = commonSettings.Value;
        }

        /**[HttpPost]
        [Route("upload")]
        public async Task<IActionResult> Upload()
        {
            var fileName = string.Format("{0}.mp4", CommonHelpers.RandomString(7));
            var fileNameToSave = string.Format("wwwroot/{0}/{1}", _commonSettings.VideoFolder, fileName);
            var filePath = string.Format("/{0}/{1}", _commonSettings.VideoFolder, fileName);

            var saveTask = new Task(() =>
            {
                if (Request.Form.Files[0] != null)
                {
                    var file = Request.Form.Files[0];
                    
                    using (FileStream fs = System.IO.File.Create(fileNameToSave))
                    {
                        file.CopyToAsync(fs);
                        fs.Flush();
                    }


                }
            });

            saveTask.Start();

            return Json(new { filePath, fileName });

        }**/

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> Upload()
        {
            var fileName = string.Empty;
            var fileNameToSave = string.Empty;
            var filePath = string.Format("/{0}/{1}.mp4", _commonSettings.VideoFolder, fileName);

            var boundary = CommonHelpers.GetBoundary(Request.ContentType);
            var reader = new MultipartReader(boundary, Request.Body);
            var section = await reader.ReadNextSectionAsync();

            while (section != null)
            {
                // process each image
                if (string.IsNullOrEmpty(fileName))
                {
                    fileName = CommonHelpers.GetFileName(section.ContentDisposition);
                    fileNameToSave = string.Format("wwwroot/{0}/{1}.mp4", _commonSettings.VideoFolder, fileName);
                }

                const int chunkSize = 1024;
                var buffer = new byte[chunkSize];
                var bytesRead = 0;

                using (var stream = new FileStream(fileNameToSave, FileMode.Append))
                {
                    do
                    {
                        bytesRead = await section.Body.ReadAsync(buffer, 0, buffer.Length);
                        stream.Write(buffer, 0, bytesRead);

                    } while (bytesRead > 0);
                }

                section = await reader.ReadNextSectionAsync();
            }

            return Json(new { fileName });
        }
    

        [HttpPost]
        [Route("getTimeStamps")]
        public IActionResult GetTimeStamps([FromBody]GetTimeStamps getTimeStamps)
        {
            var range = Enumerable.Range(0, 40);

            var stampsList = new List<TimeStamp>();

            foreach(int count in range)
            {
                stampsList.Add(new TimeStamp
                {
                    fightStart = count % 2 == 0,
                    timeStamp = count * 10
                });
            }

            return Json(stampsList.ToArray());
        }
    }
}
