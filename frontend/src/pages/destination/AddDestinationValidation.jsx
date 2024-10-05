const AddDestinationValidation = (
  destinationID,
  dTitle,
  dDescription,
  dThumbnail,
  extImages,
  dDistrict,
  dProvince,
  longitude,
  latitude
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
  // Longitude and latitude patterns
  const longitudePattern = /^-?((1[0-7][0-9])|(0?[0-9][0-9]?))(\.\d+)?$/;
  const latitudePattern = /^-?((1[0-8][0-9])|(0?[0-9][0-9]?))(\.\d+)?$/;

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
      errors.extImages = "Things to do must be valid strings.";
  }

  // Validate district and province
  const validDistricts = [
      "Colombo", "Gampaha", "Kalutara", "Kandy", "Nuwara Eliya", "Matale", "Badulla", "Monaragala",
      "Jaffna", "Kilinochchi", "Mannar", "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
      "Hambantota", "Matara", "Galle", "Kurunegala", "Puttalam", "Kegalle", "Ratnapura", "Anuradhapura",
      "Polonnaruwa"
  ];
  const validProvinces = [
      "Western", "Central", "Northern", "Southern", "Eastern", "North Western", "North Central", "Uva", "Sabaragamuwa"
  ];

  if (!validDistricts.includes(dDistrict)) {
      errors.dDistrict = "Please select a valid district.";
  }

  if (!validProvinces.includes(dProvince)) {
      errors.dProvince = "Please select a valid province.";
  }

  // Validate longitude
  if (!longitudePattern.test(longitude) || longitude < -180 || longitude > 180) {
      errors.longitude = "Longitude must be a valid number between -180 and 180.";
  }

  // Validate latitude
  if (!latitudePattern.test(latitude) || latitude < -90 || latitude > 90) {
      errors.latitude = "Latitude must be a valid number between -90 and 90.";
  }

  return errors;
};

export default AddDestinationValidation;
