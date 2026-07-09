// BDE Training — Common Things to Know Hints + Explanations

const BDE_TRAINING_HINTS = [

  // ---------- SECTION 1 — TRAFFIC STOP PROCEDURES (1-15) ----------
  { hint: "Where is it safe to stop without blocking traffic?", explanation: "Right shoulder lets officers approach from the safer side, away from traffic." },
  { hint: "Communicate your intent to the officer behind you.", explanation: "Signaling and gradual slowing tells the officer you're cooperating, not fleeing." },
  { hint: "Make yourself easy to read.", explanation: "Engine off, hands visible, body still — all signal compliance and reduce officer anxiety." },
  { hint: "Hazards signal 'I see you' when you can't stop yet.", explanation: "Turning on hazards and slowing communicates cooperation while you find a safe spot." },
  { hint: "Approach side is situational.", explanation: "Driver-side is default, but officers may vary based on traffic, threat, or terrain — either can be legitimate." },
  { hint: "Get fully off the road.", explanation: "A full car-width off the lane keeps you and the officer away from traffic." },
  { hint: "Help the officer see inside the car safely.", explanation: "Lit interior makes you and the car visible, removing a common source of officer anxiety on night stops." },
  { hint: "Any safe wide spot beats stopping in traffic.", explanation: "A wide driveway or lot is safer than blocking a live lane, even if it's not a shoulder." },
  { hint: "Full stop, not \"almost stop.\"", explanation: "Rolling stops fail to satisfy the legal requirement to come to a complete stop before proceeding." },
  { hint: "Slow down or change lanes.", explanation: "\"Move Over\" laws protect officers and workers at the roadside — most states enforce them strictly." },
  { hint: "Two options: move or slow.", explanation: "Move Over laws typically let you either change lanes or reduce speed if you can't safely change." },
  { hint: "It's about signaling compliance.", explanation: "Engine off means \"I'm not going anywhere,\" reducing the officer's threat model for the whole stop." },
  { hint: "It's a fishing question — don't take the bait.", explanation: "Officers often ask this hoping for an admission. Politely deflecting doesn't lie; it just doesn't volunteer evidence." },
  { hint: "Guessing hurts you either way.", explanation: "Any specific number you say becomes evidence — a calm redirect keeps you from unnecessarily locking in a fact." },
  { hint: "The fight belongs in court.", explanation: "Signing accepts the ticket process; contesting it happens in front of a judge, with evidence." },

  // ---------- SECTION 2 — DOCUMENTS (16-25) ----------
  { hint: "Three documents that prove your right to drive this car.", explanation: "Driver's license, vehicle registration, and proof of insurance are the standard documents most states require during a stop." },
  { hint: "Lying about your identity is its own crime.", explanation: "Forgetting your license is a minor violation. Lying about who you are can become a serious one." },
  { hint: "Expiration is enforceable and towable.", explanation: "Expired registration is a common citation and in many jurisdictions can lead to impoundment." },
  { hint: "States set the floor.", explanation: "Every state sets its own minimum liability limits — 'no insurance' is a serious ticket in most." },
  { hint: "States regulate visible light transmission.", explanation: "Most states have tint limits and use them as lawful basis to initiate a stop." },
  { hint: "Easy fix, common stop.", explanation: "Small bulb replacements are among the most common reasons drivers get pulled over." },
  { hint: "Small light, big cause of stops.", explanation: "A dark license plate is one of the easiest reasons for a nighttime stop — a $5 fix." },
  { hint: "Most states now accept phone insurance.", explanation: "Digital cards are widely accepted, though a paper backup avoids issues if your phone dies." },
  { hint: "They need to be prepared like any driver.", explanation: "Anyone driving your car should know where the documents are and know they're covered by your policy in most states." },
  { hint: "Be honest and produce what's in the car.", explanation: "Borrowed cars are common — driver's license + car's registration and insurance is the standard set." },

  // ---------- SECTION 3 — PUBLIC ENCOUNTERS (26-40) ----------
  { hint: "Officers can talk to anyone, but searches need cause.", explanation: "Casual contact is fine. A search of you or your belongings needs consent, a warrant, or probable cause." },
  { hint: "Look at the word 'consensual' — both sides agreeing.", explanation: "If you haven't been detained, the encounter is consensual: you can decline to answer and walk away." },
  { hint: "Don't run, but find out your status.", explanation: "Running can give probable cause to chase. Stopping and asking your status clarifies the encounter without escalating." },
  { hint: "If not detained, you're free.", explanation: "Without detention, the encounter is consensual and you can leave. Asking 'Am I free to go?' confirms your status." },
  { hint: "State-by-state variation.", explanation: "Some states require identification during lawful detention; others don't. Know your state's rule." },
  { hint: "Virginia is not a broad ID state.", explanation: "Virginia has no general stop-and-identify statute for pedestrians who aren't detained on other grounds." },
  { hint: "Enough to briefly detain.", explanation: "Terry v. Ohio: reasonable suspicion allows a brief investigative detention, less than arrest." },
  { hint: "Enough to investigate, not enough to arrest.", explanation: "Reasonable suspicion lets officers briefly detain you to investigate, but isn't enough to arrest or search fully." },
  { hint: "Talking isn't detaining.", explanation: "Officers can approach anyone in public; you can politely decline to engage without any legal risk." },
  { hint: "Protected speech.", explanation: "You can generally record whatever you can see in public with your own eyes." },
  { hint: "Just being there isn't loitering.", explanation: "Modern loitering statutes require additional behavior — pure presence in public isn't illegal." },
  { hint: "Groups have the same rights as individuals.", explanation: "Groups on public sidewalks are protected as long as they aren't blocking traffic or causing disturbances." },
  { hint: "Requires specific conduct.", explanation: "Disorderly conduct laws target defined behavior — fighting, threats, or unreasonable noise — not just being present." },
  { hint: "Speech is protected; regulation is manner-and-place.", explanation: "Panhandling itself is often protected speech; cities regulate where, how, and when — not the content." },
  { hint: "Private venues can set entry conditions.", explanation: "Private property owners can generally ask anyone to leave; refusing turns into trespassing." },

  // ---------- SECTION 4 — CHECKPOINTS & DUI (41-50) ----------
  { hint: "Comply with the minimum required.", explanation: "Checkpoints have specific legal procedures. Comply with the basics and don't volunteer extra information or items." },
  { hint: "Implied consent laws apply when you got your license.", explanation: "By accepting a driver's license, you implicitly consented to BAC testing. Refusal usually triggers automatic suspension." },
  { hint: "Universal threshold in most states.", explanation: "0.08% BAC is the standard for adult drivers; commercial and under-21 rules are much stricter." },
  { hint: "No safe amount for younger drivers.", explanation: "Most states have zero-tolerance policies for drivers under 21." },
  { hint: "Not the same as breathalyzer.", explanation: "Field sobriety tests are often voluntary; refusal has consequences but not the same as chemical refusal." },
  { hint: "Warrants are the norm for blood draws.", explanation: "Missouri v. McNeely: blood draws generally require a warrant unless there's a real emergency." },
  { hint: "Getting a license is agreeing to be tested.", explanation: "Implied consent means you agreed to chemical testing when you accepted the driving privilege." },
  { hint: "Neutral procedures matter.", explanation: "The Supreme Court upheld checkpoints if they follow neutral, published procedures and don't cause unreasonable delay." },
  { hint: "Marijuana rules vary widely.", explanation: "Some states use per-se THC limits; others use impairment standards — laws are in rapid flux." },
  { hint: "Impairment matters, not prescription.", explanation: "A legal prescription doesn't protect you if the drug impairs safe driving." },

  // ---------- SECTION 5 — TICKETS & COURT (51-60) ----------
  { hint: "Signing isn't admitting guilt.", explanation: "Signing is just a promise to appear or pay. The proper place to fight the ticket is court." },
  { hint: "It's a notice, not a confession.", explanation: "Your signature acknowledges receipt and a court date — nothing about whether you committed the offense." },
  { hint: "Read your ticket carefully.", explanation: "The court date is a real deadline — missing it makes things much worse." },
  { hint: "Missing court has cascading consequences.", explanation: "A bench warrant and license suspension are common outcomes of ignoring the date." },
  { hint: "Judges have discretion.", explanation: "Traffic school can sometimes reduce or dismiss charges, depending on your state, the offense, and your record." },
  { hint: "Points cost money over time.", explanation: "Insurance companies price around points, and enough of them can suspend your license." },
  { hint: "Serious enough for a lawyer.", explanation: "Criminal traffic offenses like reckless driving carry jail exposure — get real legal advice." },
  { hint: "Three plea options.", explanation: "Guilty, not guilty, and nolo contendere are the standard plea choices in traffic court." },
  { hint: "Middle ground plea.", explanation: "No contest doesn't admit guilt for civil purposes but accepts the criminal consequence." },
  { hint: "License, points, criminal — hire counsel.", explanation: "When your driving privilege or record is on the line, an attorney is worth the money." },

  // ---------- SECTION 6 — RECORDING (61-70) ----------
  { hint: "First Amendment cuts both ways.", explanation: "You're free to record under the First Amendment, and also free not to. Neither can be compelled." },
  { hint: "Public visibility matters.", explanation: "Anything visible in a public space is generally fair to record; audio adds state-specific rules." },
  { hint: "All-party consent for audio.", explanation: "Some states require every party to a private conversation to consent to audio recording." },
  { hint: "Buildings have their own rules.", explanation: "Court rules typically restrict recording inside — check signage or clerk before recording." },
  { hint: "Federal signage is authoritative.", explanation: "Many federal buildings post recording restrictions and enforce them under federal law." },
  { hint: "Private property, private rules.", explanation: "A business can ask you to stop recording or leave — trespassing follows if you refuse." },
  { hint: "Real-time preservation.", explanation: "Live-streaming captures footage even if the device is later damaged or seized." },
  { hint: "Backup protects evidence.", explanation: "Cloud backup keeps the recording safe if the phone is broken, wiped, or taken." },
  { hint: "Public visibility applies.", explanation: "Photos from public spaces of visible scenes are generally lawful and useful documentation." },
  { hint: "Legal ≠ always advisable.", explanation: "Filming kids in public is usually legal but often ethically questioned — use judgment." },

  // ---------- SECTION 7 — WITNESSING (71-80) ----------
  { hint: "Be useful without becoming a second victim.", explanation: "Calling 911 and being a credible witness is far more valuable than intervening physically." },
  { hint: "Specific details beat opinions.", explanation: "Location and observed facts are what dispatchers can act on immediately." },
  { hint: "Facts that identify people or vehicles.", explanation: "Concrete details like clothing and license plates are what investigators use to find suspects." },
  { hint: "Protection for good-faith helpers.", explanation: "Good Samaritan laws generally shield people who reasonably try to help in emergencies." },
  { hint: "Priority ranking.", explanation: "Run first if possible; hide if not; fight only as a last resort." },
  { hint: "Help within your ability.", explanation: "Calling for professional help is job one; render aid within your training and safety." },
  { hint: "Legal duty is narrow.", explanation: "In most states, ordinary people have no legal duty to help strangers, though certain roles create duties." },
  { hint: "Serious criminal exposure.", explanation: "Hit-and-run is a serious offense that turns a small accident into potential jail time." },
  { hint: "\"I don't know\" is a valid answer.", explanation: "Honesty and clear limits on your certainty make you a more credible witness." },
  { hint: "Take your time.", explanation: "Written statements can be used later — accuracy matters more than speed." },

  // ---------- SECTION 8 — EMERGENCY VEHICLES (81-85) ----------
  { hint: "Get out of the way, period.", explanation: "Pulling right and stopping is the universal rule, designed to give emergency vehicles a predictable path." },
  { hint: "Don't run reds to \"help.\"", explanation: "Entering the intersection creates more danger than yielding in place — stay stopped." },
  { hint: "Heavy penalties everywhere.", explanation: "School bus stop arm violations carry heavy fines, points, and possible license impact." },
  { hint: "Slow down or move over.", explanation: "The law protects officers, EMTs, tow drivers, and roadside workers." },
  { hint: "\"Due regard\" is the standard.", explanation: "Emergency vehicles get right-of-way but must still drive with due regard for safety." },

  // ---------- SECTION 9 — SPECIAL SITUATIONS (86-95) ----------
  { hint: "You can walk away — but not fly.", explanation: "TSA screening is a condition of boarding; leaving is fine, but flying requires cooperation." },
  { hint: "Borders are different.", explanation: "Border Patrol has expanded authority within 100 miles of any U.S. border, per federal law." },
  { hint: "Transit officers are officers.", explanation: "Treat transit police like any other law enforcement — same rights, same de-escalation rules." },
  { hint: "Federal rangers with real authority.", explanation: "NPS rangers are federal law enforcement with jurisdiction over park property." },
  { hint: "Private venues can set entry conditions.", explanation: "Private venues can require searches as a condition of entry. You can refuse but they can refuse to let you in." },
  { hint: "No search = no entry.", explanation: "Private venues can lawfully condition entry on submitting to bag checks or scans." },
  { hint: "Most states extend the open container ban to the whole car.", explanation: "Open container laws typically apply to all occupants, not just the driver." },
  { hint: "Passengers can be cited too.", explanation: "Open container laws in most states apply to any occupant, not just the driver." },
  { hint: "Federal illegality, state variation.", explanation: "Marijuana is still a federal Schedule I substance, but states vary widely on enforcement and legalization." },
  { hint: "Reciprocity varies.", explanation: "Concealed carry permits don't automatically transfer between states — research before crossing state lines." },

  // ---------- SECTION 10 — EVERYDAY CIVIC KNOWLEDGE (96-100) ----------
  { hint: "911 is for emergencies.", explanation: "Non-emergency lines handle routine complaints, saving 911 for real emergencies." },
  { hint: "Insurance requires documentation.", explanation: "A filed police report is usually required for insurance to process a theft claim." },
  { hint: "Both conditions must be true.", explanation: "Officers don't have to Mirandize you on every contact — only when you're in custody AND being interrogated." },
  { hint: "Records requests exist.", explanation: "Most jurisdictions let citizens request copies of reports involving them; procedures vary." },
  { hint: "Rights + respect = safety.", explanation: "Knowing your rights and using them respectfully is what makes public interactions go well for everyone." }
];
