import envLoader from '../utils/envLoader';
envLoader();

import apiServices from '../apiServices';
import webSocketServices from '../webSocketServices';
apiServices(5000);
webSocketServices();
