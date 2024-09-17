const UpdateValidations = (values) => {
    const errors = {};

    const tPackageTitlepattern = /^[A-Za-z\s]{10,}$/;
    const tPackageDescriptionpattern = /^[A-Za-z\s]{70,}$/;
    const tPackagePricepattern = parseFloat(values.packagePrice);
    const tPackageDestinationpattern = /^(?:[A-Za-z]+(?:\s[A-Za-z]+){1,})$/;
    const tPackageDayspattern = parseFloat(values.pDays);

    if (!tPackageTitlepattern.test(values.package_Title)) {
        errors.package_Title = "Package Title must be at least 10 letters.";
    }

    if (!tPackageDescriptionpattern.test(values.packageDes)) {
        errors.packageDes = "Package Description must be at least 75 letters.";
    }

    if (isNaN(tPackagePricepattern) || tPackagePricepattern <= 0) {
        errors.packagePrice = "Package Price must be a positive price.";
    }

    if (!tPackageDestinationpattern.test(values.pDestination)) {
        errors.pDestination = "Package Destination must be at least 2 words.";
    }

    if (![3, 5, 7].includes(tPackageDayspattern) && tPackageDayspattern <= 7) {
        errors.pDays ="Package Days must be 3, 5, 7, or more than 7.";
    }

    if (!values.isChecked) {
        errors.isChecked = 'Confirm that the package details are accurate';
    }

    return errors;

}
export default UpdateValidations;
