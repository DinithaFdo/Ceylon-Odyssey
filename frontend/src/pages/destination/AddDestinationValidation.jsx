const AddDestinationValidation = (
    destinationID,
    dTitle,
    dDescription,
    dThumbnail,
    extImages,
    dDistrict,
    dProvince
  ) => {
    const errors = {};
  
    // Regex for destinationID (Dxxx, where x is 3 digits)
    const destinationIDPattern = /^D\d{3}$/;
    // Title length between 3 and 100 characters
    const titlePattern = /^.{3,100}$/;
    // Description length between 20 and 500 characters
    const descriptionPattern = /^.{20,500}$/;
    // Thumbnail and external images should be strings
    const stringPattern = /^[\w\W]*$/;
    // District and province should be at least 3 characters and only letters
    const districtProvincePattern = /^[A-Za-z\s]{3,}$/;
  
    // Validate destinationID
    if (!destinationIDPattern.test(destinationID)) {
      errors.destinationID = "Destination ID must be in the format Dxxx (x = 3 digits).";
    }
  
    // Validate title
    if (!titlePattern.test(dTitle)) {
      errors.dTitle = "Title must be between 3 and 100 characters.";
    }
  
    // Validate description
    if (!descriptionPattern.test(dDescription)) {
      errors.dDescription = "Description must be between 20 and 500 characters.";
    }
  
    // Validate thumbnail
    if (!stringPattern.test(dThumbnail) || dThumbnail.length === 0) {
      errors.dThumbnail = "Thumbnail must be a valid string.";
    }
  
    // Validate external images
    if (!stringPattern.test(extImages) || extImages.length === 0) {
      errors.extImages = "External images must be valid strings.";
    }
  
    // Validate district
    if (!districtProvincePattern.test(dDistrict)) {
      errors.dDistrict = "District must be at least 3 characters long and contain only letters.";
    }
  
    // Validate province
    if (!districtProvincePattern.test(dProvince)) {
      errors.dProvince = "Province must be at least 3 characters long and contain only letters.";
    }
  
    return errors;
  };
  
  export default AddDestinationValidation;
  