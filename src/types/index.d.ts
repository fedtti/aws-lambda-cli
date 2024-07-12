interface UserChoices {
  packageName?: string;
}

interface NpmOptions {
  initAuthorName?: string;
  initAuthorUrl?: url;
  initLicense?: string;
  initVersion?: string; // Use the SemVer standard.
  initScope?: string;
}
