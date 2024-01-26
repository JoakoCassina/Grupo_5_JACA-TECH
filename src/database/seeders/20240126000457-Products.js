'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('products', [
    { name: 'Smart TV Samsung 55\"',
      description: 'Televisor Smart . Resolucion QLED 4K (3840x2160). Formato de pantalla wide. Procesador Quantum Lite 4K. Sonido envolvente OTS lite.',
      price: '499000',
      discount: '15'    
    },
    { name: 'TV LED Samsung 32\" FHD',
      description: 'Led TV. Resolucion 1920x1080PX. Sintonizador TDA. Brilllo 250 CD/M2. Frecuencia de barrido 60/75HZ. Sonido Stereo.',
      price: '299000',
      discount: '10'    
    },
    { name: 'Celular Samsung Galaxy A54',
      description: 'Celular. Pantalla: 6.4 " super amoled 1080 x 2340 (FHD+). Procesador: Octa-Core. Almacenamiento: 128 Gb. Ram: 8Gb.',
      price: '376000',
      discount: '5'    
    },
    { name: 'Celular Motorola RAZR 40',
      description: 'Celular. Pantalla principal de 6.9 ", resolucion 1080 x 2640 FHD+, 413ppi, HiD, 144Hz. Tecnologia pOLED.',
      price: '250000',
      discount: '0'    
    },
    { name: 'Aire acondicionado Split Samsung',
      description: 'SPLIT FRIO CALOR INVERTER 5850WATTS EQUIVALENTE A 5031 FRIGORÍAS EN FRIO Y 6140 WATTS EQUIVALENTE A 5280 FRIGORÍAS EN CALOR.',
      price: '1200000',
      discount: '15'    
    },
    { name: 'Aire acondicionado Split Philco',
      description: 'Aire Acondicinado. Split. Frio Calor. Potencia: 2730 W. Frigorias: 2348 Fg/H. Calorias: 2262 Kcal /h. Timer. Control Remoto.',
      price: '750000',
      discount: '8'    
    },
    { name: 'Turboventilador Liliana',
    description: 'Turboventilador de 18". 3 Velocidades. Parrilla frontal y post. cromada. 3 Aspas plasticas. Super silencioso.',
    price: '76999',
    discount: '10'    
    },
    { name: 'Ventilador de pie Peabody',
  description: 'Ventilador industrial de pie 26". Motor potenciado. 3 Velocidades. Oscilante. Inclinable. 2 Palas metalicas tipo avion.',
  price: '130000',
  discount: '5'    
    },
    { name: 'Parlante Philco',
    description: 'Parlante portatil con conexion inalambrica Bluetooth y Flash Light (iluminacion estilo fiesta). Potencia 500W. Entrada auxiliar mini plug 3.5mm. Radio FM.',
    price: '86999',
    discount: '20'    
    },
    { name: 'Parlante Motorola',
    description: 'Motorola Sonic Boost 220 ofrece un sonido natural, con una gran claridad y precisión, que se dispersa de manera uniforme. Un parlante que asegura potencia y calidad por igual en la reproducción de contenidos multimedia.',
    price: '90999',
    discount: '25'    
    },
    { name: 'Microondas Peabody',
    description: 'Microondas Digital. Potencia 700W. Capacidad 20 Litros. Display LED. 5 niveles de potencia. Descongelado automatico.',
    price: '120000',
    discount: '10'    
    },
    { name: 'Microondas Philco',
    description: 'Microondas digital. 8 Menues programables. 5 Niveles de coccion. Potencia microondas 900W / potencia grill 1500W. Capacidad 28L.',
    price: '150000',
    discount: '5'    
    },
    { name: 'Licuadora con vaso Peabody',
    description: 'Licuadora de 800w de potencia. Cuchillas de acero inoxidable desmontables. Ideal para triturar hielo.',
    price: '189000',
    discount: '18'    
    },
    { name: 'Licuadora Portatil Liliana',
    description: 'Con la licuadora portátil Liliana AL116 prepará tus licuados donde sea que estés, y tendrás colaciones o meriendas nutritivas, llenas de sabor en cualquier momento del día',
    price: '35000',
    discount: '5'    
    },
      ], {});
  },
  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {});
  }
};
