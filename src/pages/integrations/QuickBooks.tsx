import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConnectionStatus from '../../components/integrations/ConnectionStatus';
import SetupWizard from '../../components/integrations/SetupWizard';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';

export default function QuickBooks() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleConnect = () => {
    // Simulate OAuth flow
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
          <h1 className="text-2xl font-semibold text-gray-900">QuickBooks Online Integration</h1>
          <p className="mt-1 text-sm text-gray-500">
            Connect and sync your QuickBooks Online account with MapLedger
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SetupWizard
            currentStep={currentStep}
            onConnect={handleConnect}
            isConnected={isConnected}
          />

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
          <ConnectionStatus isConnected={isConnected} />

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
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900">Requirements</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4 text-blue-500 mr-2" />
                      QuickBooks Online account
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4 text-blue-500 mr-2" />
                      Admin access rights
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