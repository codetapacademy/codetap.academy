export default [{
    title: 'Supporter',
    disabled: false,
    selected: false,
    value: 5,
    range: {
      min: 0,
      max: 5,
      step: 1
    },
    plan_id: 'supporter',
    featureList: [
      "You get access to all FREE courses that are published and released",
      "You get a BIG BIG thank you for supporting us deliver more content in front of you",
      "You also get an invite to join us on our Discord chat",
      "We launch one lesson each week for any FREE course, hence you might have to wait until next one is released"
    ]
  },
  {
    title: 'Starter',
    disabled: false,
    selected: false,
    value: 10,
    range: {
      min: 5,
      max: 25,
      step: 5,
    },
    plan_id: 'starter',
    featureList: [
      "You get everything from the previous package",
      "You get instant access to all the released and unreleased FREE lessons",
      "You get to keep track of your progress",
      "You can automatically build your online CV using your history",
      "You get priority in getting questions answered"
    ]
  },
  {
    title: 'Student',
    disabled: false,
    selected: true,
    value: 50,
    range: {
      min: 25,
      max: 100,
      step: 5,
    },
    plan_id: 'wise',
    featureList: [
      "You get everything from the previous package",
      "You get Access to Live Coding on Real Projects",
      "You get code reviews from CodeTap Students",
      "You get to do Daily Quests",
      "You can participtate in Job Contests",
      "You can become a mentor assitant"
    ]
  },
  {
    title: 'Mentored',
    disabled: true,
    selected: false,
    value: 250,
    range: {
      min: 250,
      max: 500,
      step: 50,
    },
    plan_id: 'mentored',
    featureList: [
      "You get everything from the previous package",
      "You get Access to Mentor 1 to 1",
      "You get support in mastering how to write your Killer CV",
      "You get support before, in and after the interview",
      "You get code reviews from a Mentor",
      "You need to apply before you get accepted into this group!"
    ]
  },
]