function getPoints(L1, L2, desired_number_of_interpolation_points) {

  let interpolation_points = [];
  let lon_step = (L2[0] - L1[0]) / (desired_number_of_interpolation_points + 1);
  let lat_step = (L2[1] - L1[1]) / (desired_number_of_interpolation_points + 1);
  let elev_step = (L2[2] - L1[2]) / (desired_number_of_interpolation_points + 1);

  for (var i = 1; i < desired_number_of_interpolation_points +1 ; i++) {
    interpolation_points.push([(lon_step * i)+L1[0], (lat_step * i)+L1[1], (elev_step * i)+L1[2]]);
  }
  return interpolation_points

}

module.exports = { getPoints };
