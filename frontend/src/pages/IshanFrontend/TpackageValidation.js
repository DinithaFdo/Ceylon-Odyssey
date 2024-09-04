const TpackageValidation = (
    packageId,
    package_Title,
    pCreateDate,
    packageDes,
    packagePrice,
    pDestination,
    pDays,
    isChecked
  ) => {
    const errors = {};

    const tPackageIDpattern = /^CO\d{4}$/;
    const tPackageTitlepattern = /^[A-Za-z\s]{10,}$/;
    const tPackageCreateDatepattern = new Date().toISOString().split('T')[0];
    const tPackageDescriptionpattern = /^[A-Za-z\s]{70,}$/;
    const tPackagePricepattern = parseFloat(packagePrice);
    const tPackageDestinationpattern = /^(?:[A-Za-z]+(?:\s[A-Za-z]+){1,})$/;
    const tPackageDayspattern = parseFloat(pDays);
    
    if (!tPackageIDpattern.test(packageId)) {
        errors.packageId = "Package ID must be in the format COxxxx.";
    }

    if (!tPackageTitlepattern.test(package_Title)) {
        errors.package_Title = "Package Title must be at least 10 letters.";
    }

    if (tPackageCreateDatepattern !== pCreateDate) {
        errors.pCreateDate = "Package Create Date must be today's date";
    }

    if (!tPackageDescriptionpattern.test(packageDes)) {
        errors.packageDes = "Package Description must be at least 75 letters.";
    }

    if (isNaN(tPackagePricepattern) || tPackagePricepattern <= 0) {
        errors.packagePrice = "Package Price must be a positive price.";
    }

    if (!tPackageDestinationpattern.test(pDestination)) {
        errors.pDestination = "Package Destination must be at least 2 words.";
    }

    if (![3, 5, 7].includes(tPackageDayspattern) && tPackageDayspattern <= 7) {
        errors.pDays ="Package Days must be 3, 5, 7, or more than 7.";
    }

    if (!isChecked) {
        errors.isChecked = 'You must agree with the terms';
    }

    return errors;

}
export default TpackageValidation;