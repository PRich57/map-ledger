import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConnectionStatus from '../../components/integrations/ConnectionStatus';
import SetupWizard from '../../components/integrations/SetupWizard';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';

export default function SageIntacct() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [credentials, setCredentials] = useState({
    companyId: '',
    userId: '',
    password: '',
  });

  const handleConnect = () => {
    if (!credentials.companyId || !credentials.userId || !credentials.password) {
      return;
    }
    
    // Simulate API connection
    setTimeout(() => {
      setIsConnected(true);
      setCurrentStep(2);
    }, 1500);
  };

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/integrations"
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sage Intacct Integration</h1>
          <p className="mt-1 text-sm text-gray-500">
            Connect and sync your Sage Intacct account with MapLedger
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Setup Wizard</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    <span className="text-sm font-medium text-white">1</span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">Connect your Sage Intacct account</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Enter your Sage Intacct credentials to authorize MapLedger.
                    </p>
                    {currentStep === 1 && !isConnected && (
                      <div className="mt-4 space-y-4">
                        <Input
                          label="Company ID"
                          value={credentials.companyId}
                          onChange={(e) => setCredentials(prev => ({ ...prev, companyId: e.target.value }))}
                          placeholder="Enter your Company ID"
                        />
                        <Input
                          label="User ID"
                          value={credentials.userId}
                          onChange={(e) => setCredentials(prev => ({ ...prev, userId: e.target.value }))}
                          placeholder="Enter your User ID"
                        />
                        <Input
                          label="Password"
                          type="password"
                          value={credentials.password}
                          onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="Enter your password"
                        />
                        <button
                          onClick={handleConnect}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <KeyRound className="h-4 w-4 mr-2" />
                          Connect Sage Intacct
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    <span className="text-sm font-medium text-white">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Configure sync settings</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Choose how often you want to sync data and what historical data to import.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    <span className="text-sm font-medium text-white">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Map your accounts</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Match your Sage Intacct accounts with MapLedger's chart of accounts.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {isConnected && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Sync Settings</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Auto-sync frequency</h3>
                      <p className="text-sm text-gray-500">How often should we sync your data?</p>
                    </div>
                    <select className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      <option value="daily">Daily</option>
                      <option value="hourly">Hourly</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Sync historical data</h3>
                      <p className="text-sm text-gray-500">Import data from previous periods</p>
                    </div>
                    <select className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      <option value="3">Last 3 months</option>
                      <option value="6">Last 6 months</option>
                      <option value="12">Last 12 months</option>
                      <option value="all">All available data</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <ConnectionStatus 
            isConnected={isConnected}
            serviceName="Sage Intacct"
          />

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Integration Info</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Data Synced</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      Chart of Accounts
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      Journal Entries
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      Trial Balance
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      Dimensions
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900">Requirements</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Sage Intacct account
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Company ID & credentials
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Web Services enabled
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}