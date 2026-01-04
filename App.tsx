
import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Layout } from './components/Layout';
import { Welcome } from './pages/Welcome';
import { Marketplace } from './pages/Marketplace';
import { Workspace } from './pages/Workspace';
import { CreatorStudio } from './pages/CreatorStudio';
import { Settings } from './pages/Settings';
import { Analytics } from './pages/Analytics';
import { TopUpModal } from './components/TopUpModal';
import { ToastContainer } from './components/Toast';

const AppContent: React.FC = () => {
  const { isAuthenticated, isTopUpOpen } = useApp();
  const [activeTab, setActiveTab] = useState('marketplace');

  if (!isAuthenticated) {
    return <Welcome />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'marketplace':
        return <Marketplace onInstall={() => setActiveTab('workspace')} />;
      case 'workspace':
        return <Workspace />;
      case 'creator':
        return <CreatorStudio />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Marketplace onInstall={() => setActiveTab('workspace')} />;
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </Layout>
      <ToastContainer />
      {isTopUpOpen && <TopUpModal />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
