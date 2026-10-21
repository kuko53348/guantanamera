// screens/MenuScreen.js — the carta as its own page.
// The landing page tells the house story; everything a guest reads at the
// table — the written menu, the plates, the bar, the photos — lives here, so
// neither screen has to carry the whole restaurant in one scroll.
import { Button, Container } from 'flet-box';
import { colors } from '../theme.js';
import { ROUTES } from '../data/content.js';
import { goToSection } from '../utils/links.js';
import { Section } from '../components/ui/Section.js';
import { SectionHeading } from '../components/ui/SectionHeading.js';
import { FlavorBand } from '../components/sections/FlavorBand.js';
import { MenuSection } from '../components/sections/MenuSection.js';
import { DishBoard } from '../components/sections/DishBoard.js';
import { DrinksSection } from '../components/sections/DrinksSection.js';
import { GallerySection } from '../components/sections/GallerySection.js';
import { FooterSection } from '../components/sections/FooterSection.js';

const CartaHeader = ({ isMobile }) =>
    Section({
        id: 'carta',
        isMobile,
        bgColor: colors.background,
        gap: 24,
        children: [
            SectionHeading({
                eyebrow: 'La carta · The menu',
                title: 'Everything we cook, in one place.',
                lead: 'Four pages of Cuba: the small plates to open with, the land, the sea, and the combos that come to the middle of the table. Prices are not printed — the catch decides, so ask when you sit.',
                isMobile,
                icon: 'restaurant',
            }),
            Button({
                text: 'Back to the house',
                iconLeft: 'arrow_back',
                variant: 'text',
                size: 'large',
                color: colors.primary,
                elevation: 0,
                onPress: () => goToSection('top', ROUTES.home),
            }),
        ],
    });

export const MenuScreen = ({ isMobile = false }) =>
    Container({
        id: 'top',
        width: '100%',
        flex: 1,
        direction: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        bgColor: colors.background,
        children: [
            CartaHeader({ isMobile }),
            FlavorBand(),
            MenuSection({ isMobile }),
            DishBoard({ isMobile }),
            DrinksSection({ isMobile }),
            GallerySection({ isMobile }),
            FooterSection({ isMobile }),
        ],
    });

export default MenuScreen;
