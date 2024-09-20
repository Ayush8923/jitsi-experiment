import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Button,
  View,
  ActivityIndicator,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { JitsiMeeting } from '@jitsi/react-native-sdk';

const meetConfig = {
  subject: 'Meeting Room',
};

const meetFeatureFlags = {
  'add-people.enabled': false,
  'calendar.enabled': false,
  'call-integration.enabled': false,
  'chat.enabled': false,
  'close-captions.enabled': false,
  'invite.enabled': false,
  'android.screensharing.enabled': false,
  'live-streaming.enabled': false,
  'meeting-name.enabled': false,
  'meeting-password.enabled': true,
  'pip.enabled': true,
  'kick-out.enabled': false,
  'conference-timer.enabled': true,
  'video-share.enabled': false,
  'recording.enabled': true,
  'reactions.enabled': false,
  'raise-hand.enabled': true,
  'tile-view.enabled': true,
  'toolbox.alwaysVisible': true,
  'toolbox.enabled': true,
  'welcomepage.enabled': false,
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1, // Added flex to take full screen space
  };

  const onConferenceLeft = useCallback(() => {
    console.log('Conference Terminated');
    setMeetingStarted(false);
  }, []);

  const onConferenceWillJoin = useCallback(() => {
    console.log('Conference Will Join');
    setLoading(true); // Start showing the loader
  }, []);

  const onConferenceJoined = useCallback(() => {
    console.log('Conference Joined');
    setLoading(false); // Hide the loader when the meeting is successfully joined
  }, []);

  const eventListeners = {
    onConferenceWillJoin,
    onConferenceLeft,
    onConferenceJoined,
  };

  const startMeeting = () => {
    setMeetingStarted(true);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {!meetingStarted ? (
        <View style={styles.buttonContainer}>
          <Button title="Start Jitsi Meeting" onPress={startMeeting} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
          <JitsiMeeting
            config={meetConfig}
            eventListeners={eventListeners}
            flags={meetFeatureFlags}
            style={{ flex: 1, backgroundColor: 'black' }}
            room={'ThisIsNotATestRoomName'}
            serverURL={'https://test.video.mentortogether.org'}
            token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiIiwibmFtZSI6Ikx1a2UgU2t5IiwiZW1haWwiOiJ0ZXN0bWVudGVlMjIzQG1haWxpbmF0b3IuY29tIn19LCJhdWQiOiJqaXRzaSIsImlzcyI6InRlc3QuYXBwLm1lbnRvcnRvZ2V0aGVyLm9yZyIsInN1YiI6IioiLCJyb29tIjoiZDE2ZGRhYzYtMDhhMC00YTBlLWJhMGQtMmFlMDkzNmRiNDA0IiwiZXhwIjoxNzI2Nzc4MzIyfQ.W_qL1x_M8qNxiQdJo6f3kGBFinJrDbnrvs5Gb6QPjCA'}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  loaderContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 10,
  },
});

export default App;
