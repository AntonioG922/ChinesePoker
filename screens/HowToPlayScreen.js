import React, { useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { PlainCardContainer } from '../components/CardContainer';
import {
  dealCards, releaseTheDragon, getRandomCard, getPair, getThreeOfAKind,
  getUnion, getStraight, getStraightFlush, getFullHouse, SUITS
} from '../functions/HelperFunctions';
import { Suit } from '../components/Card';
import { HeaderText } from '../components/StyledText';
import NavBar from '../components/NavBar';
import store, { setHowToPlaySection } from '../redux/store';

export default function HowToPlayScreen({ navigation }) {
  const windowWidth = useWindowDimensions().width;
  const scrollRef = useRef();

  function handleScroll(e) {
    let xPos = e.nativeEvent.contentOffset.x;
    if (xPos % windowWidth == 0) {
      store.dispatch(setHowToPlaySection(xPos / windowWidth));
    }
  }

  function scrollToX(x) {
    scrollRef.current.scrollTo({ x: x, animated: true });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled={true}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        <MainPage />
        <Objective />
        <Rounds scrollToX={scrollToX} />
        <StartOfGame />
        <HandTypes scrollToX={scrollToX} />
        <CardRanks />
        <Unions />
        <Dragons />
      </ScrollView>

      <NavBar numPages={8} scrollRef={scrollToX} />
      <HeaderText style={styles.backArrow}>
        <Ionicons size={40} name='md-arrow-round-back' onPress={() => navigation.goBack()} />
      </HeaderText>

    </View >

    /*
      <Text style={[styles.sectionText, styles.lastSection]}>
        Legends have been told of the dragon. Tales as tall as giants. It's
        been said to be an untameable beast with nothing that can possibly
        stop it. They say those who have seen it have never lived to tell the
        tale. Only the rider of the dragon can speak to its glory as they
        leave nothing but ash in their wake. To glimpse the dragon, one must
        be dealt 1 card of every rank, 3-through-2. The knave who manages
        this feat immediately claims victory over their opponents, leaving
        them in a bitter dusty trail of defeat.
        </Text> */
  );
}

function HowToPlaySection({ pageTitle, sectionText, children, bottomSpacer = true }) {
  const windowWidth = useWindowDimensions().width;
  const font = store.getState().globalFont;

  return (
    <View style={[sectionStyles.container, { width: windowWidth }]}>
      <View style={sectionStyles.spacer} />
      <View style={sectionStyles.pageTitle} >
        <HeaderText style={{ fontSize: 55 }}>{pageTitle}</HeaderText>
      </View>
      {Boolean(sectionText) && <View style={sectionStyles.sectionTextContainer}>
        <Text style={[sectionStyles.sectionText, { fontFamily: font }]}>{sectionText}</Text>
      </View>}
      <View style={[sectionStyles.children, { flex: sectionText ? (bottomSpacer ? 4 : 5) : (bottomSpacer ? 6 : 7), fontFamily: font }]}>
        {children}
      </View>
      {bottomSpacer && <View style={sectionStyles.spacer} />}
    </View>
  )
}

function MainPage() {
  const font = store.getState().globalFont;

  return (
    <HowToPlaySection
      pageTitle={'How To Play'}
      sectionText={'Swipe to navigate'}
    >
      <Text style={[pageStyles.iconText, { fontSize: 25, fontFamily: font }]}>Standard Game:</Text>
      <View style={{ textAlign: 'center', alignItems: 'center' }}>
        <FontAwesome name='group' size={50} style={{ marginBottom: 10 }} />
        <Text style={[pageStyles.iconText, { fontFamily: font }]}>4 Players</Text>
      </View>
      <View style={{ textAlign: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons name='cards' size={50} style={{ marginBottom: 10 }} />
        <Text style={[pageStyles.iconText, { fontFamily: font }]}>13 Cards Each</Text>
      </View>
    </HowToPlaySection>
  )
}

function Objective() {
  return (
    <HowToPlaySection
      pageTitle={'Objective'}
      sectionText={'The goal of the game is to get rid of all your cards before your opponents do'}
    >
      <View style={{ alignItems: 'center' }}>
        <PlainCardContainer cards={dealCards(false)[0].cards} style={{ left: 0, width: 300 }} />
      </View>
    </HowToPlaySection>
  )
}

function Rounds({ scrollToX }) {
  const windowWidth = useWindowDimensions().width;
  const font = store.getState().globalFont;

  return (
    <HowToPlaySection
      pageTitle={'Rounds'}
    >
      <Text style={[pageStyles.iconText, { fontFamily: font }]}>Gameplay takes place in rounds{'\n\n'}A round starts with a player
           playing a hand type of their choice (see <Text style={{ textDecorationLine: 'underline' }}
          onPress={() => { scrollToX(windowWidth * 4) }}>"Hand Types"</Text>)
           {'\n\n'}Play continues clockwise and the next player must either play higher cards of the same hand type or pass
           {'\n'}(see <Text style={{ textDecorationLine: 'underline' }}
          onPress={() => { scrollToX(windowWidth * 5) }}>"Card Ranks"</Text>)
           {'\n\n'}Play continues like this until all other players pass on someones play, at which point the player
            with the winning hand starts a new round</Text>
    </HowToPlaySection>
  )
}

function HandTypes({ scrollToX }) {
  const windowWidth = useWindowDimensions().width;
  const font = store.getState().globalFont;

  return (
    <HowToPlaySection
      pageTitle={'Hand Types'}
      bottomSpacer={false}
    >
      <View style={[pageStyles.handTypeRow, { justifyContent: windowWidth > 500 ? 'space-around' : 'space-between' }]}>
        <View style={pageStyles.handType}>
          <PlainCardContainer cards={getRandomCard()} style={{ left: 0 }} />
          <Text style={[pageStyles.iconText, { top: 55, fontFamily: font }]}>Single</Text>
        </View>
        <View style={[pageStyles.handType, { left: 12 }]}>
          <PlainCardContainer cards={getPair()} style={{ left: 0, width: 35 }} />
          <Text style={[pageStyles.iconText, { top: 55, fontFamily: font }]}>Pair</Text>
        </View>
        <View style={pageStyles.handType}>
          <PlainCardContainer cards={getThreeOfAKind()} style={{ left: 0, width: 60 }} />
          <Text style={[pageStyles.iconText, { top: 55, flexShrink: 1, fontFamily: font }]}>Three of a Kind</Text>
        </View>
      </View>
      <View style={[pageStyles.handTypeRow, { justifyContent: 'space-around' }]}>
        <View style={[pageStyles.handType, { left: -25 }]}>
          <PlainCardContainer cards={getUnion()} style={{ left: 0, width: 80 }} />
          <Text style={[pageStyles.iconText, { top: 55, flexShrink: 1, fontFamily: font }]}>Four of a Kind{'\n'}(See <Text style={{ textDecorationLine: 'underline' }} onPress={() => { scrollToX(windowWidth * 6) }}>"Unions"</Text>)</Text>
        </View>
        <View style={pageStyles.handType}>
          <PlainCardContainer cards={getFullHouse()} style={{ left: 0, width: 100 }} />
          <Text style={[pageStyles.iconText, { top: 55, flexShrink: 1, fontFamily: font }]}>Full House</Text>
        </View>
      </View>
      <View style={[pageStyles.handTypeRow, { justifyContent: 'space-around' }]}>
        <View style={[pageStyles.handType, { left: 10 }]}>
          <PlainCardContainer cards={getStraight()} style={{ left: 0, width: 100 }} />
          <Text style={[pageStyles.iconText, { top: 55, flexShrink: 1, fontFamily: font }]}>Straight</Text>
        </View>
        <View style={[pageStyles.handType, { left: 20 }]}>
          <PlainCardContainer cards={getStraightFlush()} style={{ left: 0, width: 100 }} />
          <Text style={[pageStyles.iconText, { top: 55, flexShrink: 1, fontFamily: font }]}>Straight Flush</Text>
        </View>
      </View>
    </HowToPlaySection>
  )
}

function CardRanks() {
  const cardRankPair = getPair();
  const font = store.getState().globalFont;

  return (
    <HowToPlaySection
      pageTitle={'Card Ranks'}
      bottomSpacer={false}
    >
      <View>
        <Text style={[pageStyles.iconText, { fontFamily: font }]}>Cards are ranked in the following order from{'\n'}lowest(3) to highest(2)</Text>
      </View>
      <View style={{ marginVertical: 50, alignItems: 'center' }}>
        <PlainCardContainer cards={releaseTheDragon()} style={{ left: 0, width: 300 }} />
      </View>
      <View>
        <Text style={[pageStyles.iconText, { fontFamily: font }]}>Suits also matter. Suits are ranked alphabetically</Text>
      </View>
      <View style={pageStyles.suitIcons} >
        <Suit suit={SUITS.CLUB} size={60} />
        <MaterialCommunityIcons name='less-than' style={pageStyles.iconText} />
        <Suit suit={SUITS.DIAMOND} size={60} />
        <MaterialCommunityIcons name='less-than' style={pageStyles.iconText} />
        <Suit suit={SUITS.HEART} size={60} />
        <MaterialCommunityIcons name='less-than' style={pageStyles.iconText} />
        <Suit suit={SUITS.SPADE} size={60} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ marginVertical: 50, flexDirection: 'row', width: 150, justifyContent: 'space-between', alignItems: 'center' }}>
          <PlainCardContainer cards={[Math.min(...cardRankPair)]} style={{ left: 0 }} />
          <MaterialCommunityIcons name='less-than' style={pageStyles.iconText} />
          <PlainCardContainer cards={[Math.max(...cardRankPair)]} style={{ left: 0 }} />
        </View>
      </View>
    </HowToPlaySection>
  )
}

function Unions() {
  const font = store.getState().globalFont;

  return (
    <HowToPlaySection
      pageTitle={'Unions'}
    >
      <View>
        <Text style={[pageStyles.iconText, { fontFamily: font }]}>Unions are a Four of a Kind{'\n\n'}Unions are unique in that they
            can be played on any hand type and beat anything except for a higher union</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <Text style={[pageStyles.iconText, { fontFamily: font }]}>Any{'\n'}hand{'\n'}type</Text>
        <MaterialCommunityIcons name='less-than' style={[pageStyles.iconText, { left: -25 }]} />
        <PlainCardContainer cards={getUnion()} style={{ left: 0, width: 120 }} />
      </View>
    </HowToPlaySection>
  )
}

function Dragons() {
  const font = store.getState().globalFont;

  return (
    <HowToPlaySection
      pageTitle={'Dragons'}
    >
      <View>
        <Text style={[pageStyles.iconText, { fontFamily: font }]}>A Dragon is a 13 card straight{'\n\n'}If youre dealt a dragon
            you can immediately play your cards and win the game{'\n\n'}A dragon can only be played in a game where 13 cards are dealt
            {'\n\n'}Dragons are extremely rare</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <PlainCardContainer cards={releaseTheDragon()} style={{ left: 0, width: 300 }} />
      </View>
    </HowToPlaySection>
  )
}

function StartOfGame() {
  const font = store.getState().globalFont;

  return (
    <HowToPlaySection pageTitle={`Game Start`}>
      <Text style={[pageStyles.iconText, { fontFamily: font }]}>
        Each game is started by the player dealt the lowest card in the game
      </Text>
      <Text style={[pageStyles.iconText, { fontFamily: font }]}>
        They may start the game with any hand type, so long as it contains the lowest card in the game
      </Text>
      <Text style={[pageStyles.iconText, { fontFamily: font }]}>
        In a standard game with all cards dealt, this will be the:
      </Text>
      <PlainCardContainer cards={[1]} style={{ left: 0, alignSelf: 'center' }} />
    </HowToPlaySection>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingBottom: 20
  },
  backArrow: {
    position: 'absolute',
    top: 30,
    left: 30
  }
})

const sectionStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 30
  },
  pageTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTextContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 22,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  children: {
    justifyContent: 'space-around',
  },
  backArrow: {
    position: 'absolute',
    top: 30,
    left: 30
  },
  spacer: {
    flex: 1
  }
})

const pageStyles = StyleSheet.create({
  sectionHeader: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
    fontWeight: '100',
  },
  cardContainer: {
    height: 140,
    transform: [
      { translateY: 70 }
    ]
  },
  iconText: {
    fontSize: 22,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  handTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  handType: {
    alignItems: 'center',
    textAlign: 'center'
  },
  suitIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})