{ pkgs }:

{
  deps = [
    pkgs.chromium
    pkgs.nodejs_22
  ];

  env = {
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = "true";
    PUPPETEER_EXECUTABLE_PATH = "${pkgs.chromium}/bin/chromium";
  };
}
