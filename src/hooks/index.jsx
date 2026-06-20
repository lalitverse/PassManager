import { ActivityProvider } from './useActivity';
import { AuthProvider } from './useAuth';
import { SettingsProvider } from './useSettings';
import { NotificationsProvider } from './useNotifications';
import { VaultProvider } from './useVault';

export function AppProviders({ children }) {
  return (
    <ActivityProvider>
      <SettingsProvider>
        <NotificationsProvider>
          <AuthProvider>
            <VaultProvider>
              {children}
            </VaultProvider>
          </AuthProvider>
        </NotificationsProvider>
      </SettingsProvider>
    </ActivityProvider>
  );
}
