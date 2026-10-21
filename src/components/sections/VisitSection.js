// components/sections/VisitSection.js — address, phone, hours and the FAQ.
import { Accordion, Button, Column, Container, Icon, Image, Row, Text, border } from 'flet-box';
import { colors, fonts } from '../../theme.js';
import { FAQ, RESTAURANT } from '../../data/content.js';
import { callRestaurant, openExternal } from '../../utils/links.js';
import { Grid } from '../ui/Grid.js';
import { Section } from '../ui/Section.js';
import { SectionHeading } from '../ui/SectionHeading.js';

const Detail = ({ icon, label, value }) =>
    Row({
        width: '100%',
        gap: 16,
        alignItems: 'flex-start',
        children: [
            Container({
                width: 40,
                height: 40,
                borderRadius: 8,
                bgColor: colors.surface,
                border: border(1, 'solid', colors.border),
                justifyContent: 'center',
                alignItems: 'center',
                child: Icon({ name: icon, size: 20, color: colors.primary }),
            }),
            Column({
                flex: 1,
                gap: 0,
                alignItems: 'flex-start',
                children: [
                    Text({
                        text: label,
                        size: 12,
                        weight: 600,
                        color: colors.textSecondary,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                    }),
                    Text({
                        text: value,
                        size: 16,
                        color: colors.text,
                        lineHeight: 1.5,
                    }),
                ],
            }),
        ],
    });

const ReserveCard = ({ isMobile }) =>
    Container({
        width: '100%',
        bgColor: colors.card,
        border: border(1, 'solid', colors.border),
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 2,
        children: [
            Container({
                width: '100%',
                bgColor: 'transparent',
                height: isMobile ? 200 : 240,
                overflow: 'hidden',
                child: Image({
                    src: 'assets/landing/terrace-tables.webp',
                    alt: 'Tables set on the Guantanamera terrace with a view of the sea',
                    width: '100%',
                    height: '100%',
                    fit: 'cover',
                }),
            }),
            Container({
                width: '100%',
                padding: 24,
                gap: 16,
                bgColor: 'transparent',
                children: [
                    Column({
                        gap: 8,
                        alignItems: 'flex-start',
                        children: [
                            Text({
                                text: 'Reserve a table',
                                size: 24,
                                weight: 700,
                                color: colors.text,
                                fontFamily: fonts.display,
                                lineHeight: 1.2,
                            }),
                            Text({
                                text: 'Walk-ins are always welcome. For groups, birthdays or a sunset on the terrace, call ahead and we will set the table.',
                                size: 14,
                                color: colors.textSecondary,
                                lineHeight: 1.5,
                            }),
                        ],
                    }),
                    Container({
                        width: '100%',
                        bgColor: colors.surface,
                        borderRadius: 12,
                        padding: 16,
                        gap: 4,
                        children: [
                            Text({
                                text: 'Reservations',
                                size: 12,
                                weight: 600,
                                color: colors.textSecondary,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                            }),
                            Text({
                                text: RESTAURANT.phone,
                                size: 24,
                                weight: 700,
                                color: colors.primary,
                                fontFamily: fonts.display,
                            }),
                            Text({
                                text: `${RESTAURANT.hours} · ${RESTAURANT.hoursDetail}`,
                                size: 12,
                                color: colors.textSecondary,
                            }),
                        ],
                    }),
                    Button({
                        text: 'Call to reserve',
                        iconLeft: 'phone',
                        size: 'large',
                        fullWidth: true,
                        borderRadius: 999,
                        bgColor: colors.primary,
                        color: colors.white,
                        elevation: 0,
                        onPress: () => callRestaurant(RESTAURANT.phoneHref),
                    }),
                    Button({
                        text: 'Message us on Instagram',
                        iconLeft: 'photo_camera',
                        variant: 'outlined',
                        size: 'large',
                        fullWidth: true,
                        borderRadius: 999,
                        color: colors.primary,
                        elevation: 0,
                        onPress: () => openExternal(RESTAURANT.instagram),
                    }),
                ],
            }),
        ],
    });

export const VisitSection = ({ isMobile }) =>
    Section({
        id: 'visit',
        isMobile,
        bgColor: colors.background,
        gap: 48,
        children: [
            isMobile
                ? Column({
                      width: '100%',
                      gap: 32,
                      children: [
                          Column({
                              width: '100%',
                              gap: 24,
                              children: [
                                  SectionHeading({
                                      eyebrow: 'Plan your visit',
                                      title: 'Find the blue door.',
                                      lead: RESTAURANT.mapNote,
                                      isMobile,
                                      icon: 'place',
                                  }),
                                  Detail({ icon: 'place', label: 'Address', value: RESTAURANT.address }),
                                  Detail({ icon: 'phone', label: 'Phone', value: RESTAURANT.phone }),
                                  Detail({
                                      icon: 'schedule',
                                      label: 'Hours',
                                      value: `${RESTAURANT.hours} · ${RESTAURANT.hoursDetail}`,
                                  }),
                                  Detail({
                                      icon: 'photo_camera',
                                      label: 'Instagram',
                                      value: RESTAURANT.instagramHandle,
                                  }),
                                  Row({
                                      gap: 16,
                                      wrap: true,
                                      children: [
                                          Button({
                                              text: 'Get directions',
                                              iconLeft: 'map',
                                              size: 'large',
                                              borderRadius: 999,
                                              bgColor: colors.primary,
                                              color: colors.white,
                                              elevation: 0,
                                              onPress: () => openExternal(RESTAURANT.directions),
                                          }),
                                          Button({
                                              text: 'Call',
                                              iconLeft: 'phone',
                                              variant: 'outlined',
                                              size: 'large',
                                              borderRadius: 999,
                                              color: colors.primary,
                                              elevation: 0,
                                              onPress: () => callRestaurant(RESTAURANT.phoneHref),
                                          }),
                                      ],
                                  }),
                              ],
                          }),
                          ReserveCard({ isMobile }),
                      ],
                  })
                : Row({
                      width: '100%',
                      gap: 48,
                      alignItems: 'flex-start',
                      children: [
                          Container({
                              flex: 1,
                              minWidth: 0,
                              gap: 24,
                              bgColor: 'transparent',
                              children: [
                                  SectionHeading({
                                      eyebrow: 'Plan your visit',
                                      title: 'Find the blue door.',
                                      lead: RESTAURANT.mapNote,
                                      isMobile,
                                      icon: 'place',
                                  }),
                                  Detail({ icon: 'place', label: 'Address', value: RESTAURANT.address }),
                                  Detail({ icon: 'phone', label: 'Phone', value: RESTAURANT.phone }),
                                  Detail({
                                      icon: 'schedule',
                                      label: 'Hours',
                                      value: `${RESTAURANT.hours} · ${RESTAURANT.hoursDetail}`,
                                  }),
                                  Detail({
                                      icon: 'photo_camera',
                                      label: 'Instagram',
                                      value: RESTAURANT.instagramHandle,
                                  }),
                                  Row({
                                      gap: 16,
                                      wrap: true,
                                      children: [
                                          Button({
                                              text: 'Get directions',
                                              iconLeft: 'map',
                                              size: 'large',
                                              borderRadius: 999,
                                              bgColor: colors.primary,
                                              color: colors.white,
                                              elevation: 0,
                                              onPress: () => openExternal(RESTAURANT.directions),
                                          }),
                                          Button({
                                              text: 'Call',
                                              iconLeft: 'phone',
                                              variant: 'outlined',
                                              size: 'large',
                                              borderRadius: 999,
                                              color: colors.primary,
                                              elevation: 0,
                                              onPress: () => callRestaurant(RESTAURANT.phoneHref),
                                          }),
                                      ],
                                  }),
                              ],
                          }),
                          Container({
                              flex: 1,
                              minWidth: 0,
                              bgColor: 'transparent',
                              child: ReserveCard({ isMobile }),
                          }),
                      ],
                  }),
            Column({
                width: '100%',
                gap: 24,
                children: [
                    SectionHeading({
                        eyebrow: 'Good to know',
                        title: 'Before you come.',
                        isMobile,
                        icon: 'info',
                    }),
                    Grid({
                        items: FAQ,
                        columns: isMobile ? 1 : 2,
                        gap: 16,
                        renderItem: (entry) =>
                            Accordion({
                                title: entry.question,
                                children: Text({
                                    text: entry.answer,
                                    size: 14,
                                    color: colors.textSecondary,
                                    lineHeight: 1.5,
                                }),
                                variant: 'outlined',
                                borderRadius: 12,
                                bgColor: colors.card,
                                titleColor: colors.text,
                                titleSize: 16,
                                titleWeight: '600',
                                iconColor: colors.primary,
                                contentPadding: '0 16px 16px 16px',
                            }),
                    }),
                ],
            }),
        ],
    });

export default VisitSection;
