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

        [HttpPost]
        [Route("upload")]
        public IActionResult Upload()
        {

            if (Request.Form.Files[0] != null)
            {
                var file = Request.Form.Files[0];

                var fileName = string.Format("{0}.mp4", CommonHelpers.RandomString(7));
                var fileNameToSave = string.Format("wwwroot/{0}/{1}", _commonSettings.VideoFolder, fileName);
                var filePath = string.Format("/{0}/{1}", _commonSettings.VideoFolder, fileName);

                using (FileStream fs = System.IO.File.Create(fileNameToSave))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }

                return Json(new { filePath, fileName });
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("getTimeStamps")]
        public IActionResult GetTimeStamps([FromBody]GetTimeStamps getTimeStamps)
        {
            var range = Enumerable.Range(1, 40);

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
