import React from 'react';
import { AppProvider } from './components/core/AppProvider';
import SceneManager from './components/core/SceneManager';

export default function App() {
  return (
    <AppProvider>
      <SceneManager />
    </AppProvider>
  );
}
