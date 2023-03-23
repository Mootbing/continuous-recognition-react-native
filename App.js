
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { Component } from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import 'react-native-get-random-values';
import 'node-libs-react-native/globals';
import { AudioConfig, AudioInputStream, AudioStreamFormat, CancellationDetails, CancellationReason, NoMatchDetails, NoMatchReason, ResultReason, SpeechConfig, SpeechRecognizer, SpeechTranslationConfig, TranslationRecognizer } from 'microsoft-cognitiveservices-speech-sdk';

import LiveAudioStream from 'react-native-live-audio-stream';

export default App = () => {
  LiveAudioStream.init({
    sampleRate: 16000,
    bufferSize: 4096,
    channels: 1,
    bitsPerChannel: 16,
    audioSource: 6,
  });

  const pushStream = AudioInputStream.createPushStream();

  LiveAudioStream.on('data', (data) => {
    const pcmData = Buffer.from(data, 'base64');
    pushStream.write(pcmData);
  });

  const speechTranslationConfig = SpeechTranslationConfig.fromSubscription("--key--", "region");
  speechTranslationConfig.speechRecognitionLanguage = "zh-CN";
  speechTranslationConfig.addTargetLanguage("en");
  const audioConfig = AudioConfig.fromStreamInput(
    pushStream,
    AudioStreamFormat.getWaveFormatPCM(16000, 16, 1)
  );
  const translationRecognizer = new TranslationRecognizer(speechTranslationConfig, audioConfig);

  translationRecognizer.recognizing = (s, e) => {
    console.log(`RECOGNIZING: Text=${e.result.text}`);
    console.log(`RECOGNIZING: Text=${e.result.translations.get("en")}`);
  };

  translationRecognizer.startContinuousRecognitionAsync(() => {
    console.log("Translation recognizer started");
  }, 
    (err) => {
      console.log(err);
    }
  );

  return <SafeAreaView style={{flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
    
    <Pressable style={{padding: 15, backgroundColor: "white", borderRadius: 15}} onPress={
      () => {
        console.log("Listening");
        LiveAudioStream.start(); 
      }}>
      <Text style={{color: "black"}}>Micstream start</Text>
    </Pressable>
      <Pressable style={{padding: 15, backgroundColor: "white", borderRadius: 15}} onPress={
      () => {
        console.log("Stopping");
        LiveAudioStream.stop(); 
      }}>
      <Text style={{color: "black"}}>Micstream stop</Text>
      </Pressable>
  </SafeAreaView>;
};