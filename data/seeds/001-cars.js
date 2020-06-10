
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          vin: '3MNZ34EAGFNI2YZ9G',
          make: 'Ford',
          model: 'Falcon',
          mileage: 15000,
          transmission: 'Manual',
          titleStatus: 'Bonded'
        },
        {
          vin: 'GW80OS1IMZEN2SYGS',
          make: 'Honda',
          model: 'Civic',
          mileage: 80000,
          transmission: 'Automatic',
          titleStatus: 'Junk'
        },
        {
          vin: '4EQXFU3F2EBVQMMJG',
          make: 'Toyota',
          model: 'Prius',
          mileage: 20000,
          transmission: 'Automatic',
          titleStatus: 'Clean'
        },
        {
          vin: 'ZL4A5J3UPA3IPEH1F',
          make: 'Acura',
          model: 'MDX',
          mileage: 8000,
          transmission: 'Automatic',
          titleStatus: 'Clean'
        },
        {
          vin: 'HO00X0KRATNGK9SVZ',
          make: 'BMW',
          model: '6 Series',
          mileage: 5000,
          transmission: 'Manual',
          titleStatus: 'Reconstructed'
        },
      ]);
    });
};
