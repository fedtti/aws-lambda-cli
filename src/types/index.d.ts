interface UserAnswers {
  packageName: string;
  packageDescription: string;
  typeScriptSupport: boolean;
  additionalFeatures: string[];
}

interface PackageOptions {
  license: string | undefined;
}
