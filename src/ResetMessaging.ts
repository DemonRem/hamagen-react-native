import { Vibration } from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { startLocationTracking } from './services/LocationService';
import { scheduleTask } from './services/BackgroundService';
import { initLocalHeadless } from './actions/LocaleActions';
import log from './services/LogService';
import { initConfig } from './config/config';
import { initBLETracing } from './services/BLEService';

const ResetMessaging = async (callConfig: boolean = true) => {
  await log("silent push notification headless")
  // vibrate toast for Debugging sake
  Vibration.vibrate(1500);

  try {
    await BackgroundFetch.stop();

    if(callConfig){
      await initConfig();
    }
    await scheduleTask();

    const { locale, notificationData } = await initLocalHeadless();
    await BackgroundGeolocation.stop();
    await startLocationTracking(locale, notificationData);

    await initBLETracing()
  } catch (error) {
    console.log(error);
  }
};

export default ResetMessaging;