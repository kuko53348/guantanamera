// components/sections/FooterSection.js — the last call: table, phone, door.
import { Button, Column, Container, Icon, Row, Text, border, rgba } from 'flet-box';
import { colors, fonts, layout } from '../../theme.js';
import { NAV_LINKS, RESTAURANT, ROUTES } from '../../data/content.js';
import { callRestaurant, goToSection, openExternal } from '../../utils/links.js';
import { isCaseless, t } from '../../utils/i18n.js';
import { TileStrip } from './FlavorBand.js';

const FooterLink = ({ label, id, route }) =>
    Text({
        text: t(label),
        size: 14,
        color: rgba(255, 255, 255, 0.72),
        cursor: 'pointer',
        onPress: () => goToSection(id, route),
    });

const FooterColumn = ({ title, children }) =>
    Column({
        gap: 16,
        alignItems: 'flex-start',
        children: [
            Text({
                text: t(title),
                size: 12,
                weight: 600,
                color: rgba(255, 255, 255, 0.6),
                letterSpacing: isCaseless() ? 0 : 2,
                textTransform: isCaseless() ? 'none' : 'uppercase',
            }),
            ...children,
        ],
    });

const SiteColumn = () =>
    FooterColumn({
        title: 'Site',
        children: [
            Row({
                gap: 8,
                alignItems: 'center',
                cursor: 'pointer',
                // The GitHub profile lives on the developer page now: the footer
                // row is the door into it, so a guest who wants to know who wrote
                // this lands on the people, not on a code host.
                onPress: () => goToSection('top', ROUTES.developer),
                children: [
                    Icon({ name: 'code', size: 20, color: colors.white }),
                    Text({
                        text: RESTAURANT.developerName,
                        size: 14,
                        color: colors.white,
                    }),
                ],
            }),
            Text({
                text: t('Design & development'),
                size: 14,
                color: rgba(255, 255, 255, 0.72),
            }),
            Row({
                gap: 8,
                alignItems: 'center',
                cursor: 'pointer',
                onPress: () => goToSection('collective', ROUTES.developer),
                children: [
                    Icon({ name: 'favorite', size: 18, color: colors.white }),
                    Text({
                        text: t('Thanks to the team'),
                        size: 14,
                        color: rgba(255, 255, 255, 0.72),
                    }),
                ],
            }),
        ],
    });

export const FooterSection = ({ isMobile }) =>
    Container({
        width: '100%',
        bgColor: colors.text,
        direction: 'column',
        children: [
            TileStrip({ height: 24 }),
            Container({
                width: '100%',
                direction: 'column',
                alignItems: 'center',
                // Container paints the framework's default `colors.surface` when
                // given no bgColor, and that default is theme-driven: near-white
                // under a light prefers-color-scheme. Left unset it buried the
                // whole footer in white and hid every white label on it.
                bgColor: 'transparent',
                paddingTop: isMobile ? 32 : 48,
                paddingBottom: 32,
                paddingLeft: isMobile ? 24 : 48,
                paddingRight: isMobile ? 24 : 48,
                child: Container({
                    width: '100%',
                    maxWidth: layout.maxWidth,
                    direction: 'column',
                    gap: 48,
                    bgColor: 'transparent',
                    children: [
                        Column({
                            gap: 24,
                            alignItems: isMobile ? 'flex-start' : 'center',
                            children: [
                                Text({
                                    text: t('Your table is waiting.'),
                                    size: 32,
                                    weight: 700,
                                    color: colors.white,
                                    fontFamily: fonts.display,
                                    align: isMobile ? 'left' : 'center',
                                    lineHeight: 1.2,
                                }),
                                Text({
                                    text: `${t(RESTAURANT.hours)} · ${t(RESTAURANT.hoursDetail)} · ${t(RESTAURANT.addressShort)}`,
                                    size: 16,
                                    color: rgba(255, 255, 255, 0.72),
                                    align: isMobile ? 'left' : 'center',
                                }),
                                Row({
                                    gap: 16,
                                    wrap: true,
                                    justifyContent: isMobile ? 'flex-start' : 'center',
                                    children: [
                                        Button({
                                            text: t('Call to reserve'),
                                            iconLeft: 'phone',
                                            size: 'large',
                                            borderRadius: 999,
                                            bgColor: colors.primary,
                                            color: colors.white,
                                            elevation: 0,
                                            onPress: () => callRestaurant(RESTAURANT.phoneHref),
                                        }),
                                        Button({
                                            text: t('Get directions'),
                                            iconLeft: 'map',
                                            variant: 'outlined',
                                            size: 'large',
                                            borderRadius: 999,
                                            color: colors.white,
                                            elevation: 0,
                                            onPress: () => openExternal(RESTAURANT.directions),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        Container({ width: '100%', height: 1, bgColor: rgba(255, 255, 255, 0.16) }),
                        isMobile
                            ? Column({
                                  width: '100%',
                                  gap: 32,
                                  children: [
                                      Column({
                                          gap: 8,
                                          alignItems: 'flex-start',
                                          children: [
                                              Text({
                                                  text: RESTAURANT.name,
                                                  size: 32,
                                                  weight: 700,
                                                  color: colors.white,
                                                  fontFamily: fonts.display,
                                              }),
                                              Text({
                                                  text: t('Cuban soul, served daily in Varadero.'),
                                                  size: 14,
                                                  color: rgba(255, 255, 255, 0.72),
                                              }),
                                          ],
                                      }),
                                      FooterColumn({
                                          title: 'Explore',
                                          children: NAV_LINKS.map((link) => FooterLink(link)),
                                      }),
                                      FooterColumn({
                                          title: 'Visit',
                                          children: [
                                              Text({
                                                  text: t(RESTAURANT.address),
                                                  size: 14,
                                                  color: rgba(255, 255, 255, 0.72),
                                                  lineHeight: 1.5,
                                              }),
                                              Text({
                                                  text: RESTAURANT.phone,
                                                  size: 14,
                                                  color: colors.white,
                                              }),
                                              Text({
                                                  text: `${t(RESTAURANT.hours)} · ${t(RESTAURANT.hoursDetail)}`,
                                                  size: 14,
                                                  color: rgba(255, 255, 255, 0.72),
                                              }),
                                          ],
                                      }),
                                      FooterColumn({
                                          title: 'Follow',
                                          children: [
                                              Row({
                                                  gap: 8,
                                                  alignItems: 'center',
                                                  cursor: 'pointer',
                                                  onPress: () => openExternal(RESTAURANT.instagram),
                                                  children: [
                                                      Icon({
                                                          name: 'photo_camera',
                                                          size: 20,
                                                          color: colors.white,
                                                      }),
                                                      Text({
                                                          text: RESTAURANT.instagramHandle,
                                                          size: 14,
                                                          color: colors.white,
                                                      }),
                                                  ],
                                              }),
                                              Text({
                                                  text: t('Son cubano on select evenings.'),
                                                  size: 14,
                                                  color: rgba(255, 255, 255, 0.72),
                                              }),
                                          ],
                                      }),
                                      SiteColumn(),
                                  ],
                              })
                            : Row({
                                  width: '100%',
                                  gap: 48,
                                  alignItems: 'flex-start',
                                  children: [
                                      Container({
                                          flex: 2,
                                          minWidth: 0,
                                          gap: 8,
                                          bgColor: 'transparent',
                                          children: [
                                              Text({
                                                  text: RESTAURANT.name,
                                                  size: 32,
                                                  weight: 700,
                                                  color: colors.white,
                                                  fontFamily: fonts.display,
                                              }),
                                              Text({
                                                  text: t('Cuban soul, served daily in Varadero.'),
                                                  size: 14,
                                                  color: rgba(255, 255, 255, 0.72),
                                              }),
                                          ],
                                      }),
                                      Container({
                                          flex: 1,
                                          minWidth: 0,
                                          bgColor: 'transparent',
                                          child: FooterColumn({
                                              title: 'Explore',
                                              children: NAV_LINKS.map((link) => FooterLink(link)),
                                          }),
                                      }),
                                      Container({
                                          flex: 2,
                                          minWidth: 0,
                                          bgColor: 'transparent',
                                          child: FooterColumn({
                                              title: 'Visit',
                                              children: [
                                                  Text({
                                                      text: t(RESTAURANT.address),
                                                      size: 14,
                                                      color: rgba(255, 255, 255, 0.72),
                                                      lineHeight: 1.5,
                                                  }),
                                                  Text({
                                                      text: RESTAURANT.phone,
                                                      size: 14,
                                                      color: colors.white,
                                                  }),
                                                  Text({
                                                      text: `${t(RESTAURANT.hours)} · ${t(RESTAURANT.hoursDetail)}`,
                                                      size: 14,
                                                      color: rgba(255, 255, 255, 0.72),
                                                  }),
                                              ],
                                          }),
                                      }),
                                      Container({
                                          flex: 2,
                                          minWidth: 0,
                                          bgColor: 'transparent',
                                          child: FooterColumn({
                                              title: 'Follow',
                                              children: [
                                                  Row({
                                                      gap: 8,
                                                      alignItems: 'center',
                                                      cursor: 'pointer',
                                                      onPress: () => openExternal(RESTAURANT.instagram),
                                                      children: [
                                                          Icon({
                                                              name: 'photo_camera',
                                                              size: 20,
                                                              color: colors.white,
                                                          }),
                                                          Text({
                                                              text: RESTAURANT.instagramHandle,
                                                              size: 14,
                                                              color: colors.white,
                                                          }),
                                                      ],
                                                  }),
                                                  Text({
                                                      text: t('Son cubano on select evenings.'),
                                                      size: 14,
                                                      color: rgba(255, 255, 255, 0.72),
                                                  }),
                                              ],
                                          }),
                                      }),
                                      Container({
                                          flex: 1,
                                          minWidth: 0,
                                          bgColor: 'transparent',
                                          child: SiteColumn(),
                                      }),
                                  ],
                              }),
                        Container({
                            width: '100%',
                            bgColor: 'transparent',
                            direction: isMobile ? 'column' : 'row',
                            justifyContent: 'space-between',
                            alignItems: isMobile ? 'flex-start' : 'center',
                            gap: 8,
                            borderTop: border(1, 'solid', rgba(255, 255, 255, 0.16)),
                            paddingTop: 24,
                            children: [
                                Text({
                                    text: t('© 2026 Guantanamera · Varadero, Cuba'),
                                    size: 12,
                                    color: rgba(255, 255, 255, 0.6),
                                }),
                                Row({
                                    gap: 16,
                                    alignItems: 'center',
                                    children: [
                                        Text({
                                            text: t('Hecho con sabor en Varadero'),
                                            size: 12,
                                            color: rgba(255, 255, 255, 0.6),
                                        }),
                                        Text({
                                            text: t('Back to top'),
                                            size: 12,
                                            weight: 600,
                                            color: colors.white,
                                            cursor: 'pointer',
                                            onPress: () => goToSection('top', ROUTES.home),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });

export default FooterSection;
