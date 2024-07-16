interface UserAnswers {
  packageName: string;
  packageDescription: string;
  typeScriptSupport: boolean;
  additionalFeatures: string[];
}

interface PackageOptions {
  initAuthorName?: string;
  initAuthorUrl?: url;
  initLicense?: string;
  initVersion?: string; // Please, use the SemVer de facto standard numbering system.
  initScope?: string;
}
