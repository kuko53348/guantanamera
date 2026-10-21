// screens/HomeScreen.js
import { Container, Column, Text, Button, Icon, colors, goTo } from 'flet-box';

// ========== GOOGLE ADMOB (optional — disabled by default) ==========
// AdMob shows native ads in Android/iOS builds. To enable it:
//   1. Install the Capacitor plugin:
//        npm install @capacitor-community/admob
//   2. Add your real AdMob App ID to the native projects (see the README
//      "Ads (AdSense & AdMob)" section for the Android/iOS manifest keys),
//      then run: npm run android:sync && npm run ios:sync
//   3. Uncomment the AdMob import and the <AdMob .../> widget below.
// While developing, keep isTesting: true so you serve Google's sample ads
// (never click your own live ads — AdMob can ban the account).
//
// import { AdMob } from 'flet-box';
// =====================================================================

export const HomeScreen = () => {
    return Container({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: colors.background,
        child: Column({
            gap: 32,
            alignItems: 'center',
            children: [
                Container({
                    width: 96,
                    height: 96,
                    borderRadius: 24,
                    backgroundColor: colors.primary + '15',
                    justifyContent: 'center',
                    alignItems: 'center',
                    child: Icon({ name: 'rocket_launch', size: 56, color: colors.primary })
                }),
                Text({ 
                    text: 'Welcome to FletBox', 
                    size: 32, 
                    weight: 'bold', 
                    color: colors.text, 
                    align: 'center' 
                }),
                Text({ 
                    text: 'Choose a section to explore:', 
                    size: 16, 
                    color: colors.textSecondary, 
                    align: 'center' 
                }),
                Column({
                    gap: 12,
                    alignItems: 'stretch',
                    style: { width: '100%', maxWidth: 280 },
                    children: [
                        Button({ 
                            text: '🏠 Home', 
                            iconRight: 'arrow_forward',
                            bgColor: colors.primary, 
                            color: '#ffffff',
                            padding: '12px 20px',
                            fullWidth: true,
                            onPress: () => goTo('/home') 
                        }),
                        Button({ 
                            text: 'ℹ️ About', 
                            iconRight: 'arrow_forward',
                            variant: 'outlined',
                            color: colors.info,
                            padding: '12px 20px',
                            fullWidth: true,
                            onPress: () => goTo('/about') 
                        }),
                        Button({ 
                            text: '← Back to Root', 
                            iconLeft: 'arrow_back',
                            variant: 'text',
                            color: colors.textSecondary,
                            padding: '12px 20px',
                            fullWidth: true,
                            onPress: () => goTo('/') 
                        })
                    ]
                })

                // ===== ADMOB BANNER (optional — uncomment to enable) =====
                // Uses Google's sample unit id while isTesting is true.
                // Replace adId with your own banner unit id before going live.
                // AdMob({
                //     position: 'bottom',
                //     isTesting: true,
                //     // adId: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
                // })
            ]
        })
    });
};

export default HomeScreen;
