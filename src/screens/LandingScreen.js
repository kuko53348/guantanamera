// screens/LandingScreen.js — the house story, one scroll.
// The carta is its own screen (MenuScreen); what stays here is the reason to
// come: the door, the room, the plates worth driving for, and how to find us.
import { Container } from 'flet-box';
import { colors } from '../theme.js';
import { HeroSection } from '../components/sections/HeroSection.js';
import { FlavorBand } from '../components/sections/FlavorBand.js';
import { StorySection } from '../components/sections/StorySection.js';
import { SignatureSection } from '../components/sections/SignatureSection.js';
import { SeaBand } from '../components/sections/SeaBand.js';
import { ReviewsSection } from '../components/sections/ReviewsSection.js';
import { VisitSection } from '../components/sections/VisitSection.js';
import { FooterSection } from '../components/sections/FooterSection.js';

export const LandingScreen = ({ isMobile = false }) =>
    Container({
        id: 'top',
        width: '100%',
        flex: 1,
        direction: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        bgColor: colors.background,
        children: [
            HeroSection({ isMobile }),
            FlavorBand(),
            StorySection({ isMobile }),
            SignatureSection({ isMobile }),
            SeaBand({ isMobile }),
            ReviewsSection({ isMobile }),
            VisitSection({ isMobile }),
            FooterSection({ isMobile }),
        ],
    });

export default LandingScreen;
