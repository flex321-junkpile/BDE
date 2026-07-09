// BDE Training — Your Rights When Stopped by Police Hints + Explanations

const BDE_TRAINING_HINTS = [

  // ---------- SECTION 1 — FOURTH AMENDMENT (1-15) ----------
  { hint: "Protects your person, property, and effects.", explanation: "The Fourth Amendment requires warrants or probable cause for most searches and arrests." },
  { hint: "It's about expectation, not just physical entry.", explanation: "A search happens when the government intrudes into an area a reasonable person expects to be private." },
  { hint: "Two prongs: property and freedom.", explanation: "Seizure can mean taking property or restraining movement — both are covered." },
  { hint: "Without those three things, you can decline.", explanation: "Police need a warrant, probable cause, or your consent to search. Take away those and you can refuse." },
  { hint: "Silence can be misread as agreement.", explanation: "Saying 'I do not consent to a search' is the cleanest way to preserve your Fourth Amendment claim later." },
  { hint: "Your refusal doesn't override their independent legal basis.", explanation: "Refusal protects you when the search is consent-based; it doesn't stop a warrant or probable cause search." },
  { hint: "Two conditions: lawful presence and obvious contraband.", explanation: "Plain view isn't a search — the officer must be somewhere they're allowed to be, and the item must clearly be evidence." },
  { hint: "Three requirements.", explanation: "A valid search warrant needs probable cause, particularity about what and where, and a neutral judge's signature." },
  { hint: "Illegal evidence stays out.", explanation: "The exclusionary rule prevents illegally-obtained evidence from being used against you at trial." },
  { hint: "Derivative evidence is also excluded.", explanation: "Evidence traced back to an illegal search generally gets excluded too, unless an exception applies." },
  { hint: "Home has the strongest protection.", explanation: "The Supreme Court has repeatedly held that the home has the highest expectation of privacy." },
  { hint: "The immediate surroundings count.", explanation: "Curtilage — the area intimately tied to home use — gets similar Fourth Amendment protection." },
  { hint: "Curbside trash is out.", explanation: "Once trash is on the curb for pickup, courts hold there's no reasonable expectation of privacy." },
  { hint: "Modern devices need a warrant.", explanation: "Riley v. California ruled cell phones are special — a search-incident-to-arrest exception doesn't cover their contents." },
  { hint: "Long-term tracking needs a warrant.", explanation: "Jones held that installing a GPS tracker is a search requiring a warrant." },

  // ---------- SECTION 2 — FIFTH AMENDMENT (16-30) ----------
  { hint: "Protects against self-incrimination.", explanation: "The Fifth Amendment prevents the government from forcing you to testify against yourself." },
  { hint: "Just being quiet isn't enough.", explanation: "Salinas v. Texas confirmed you must actually invoke the right — silence alone can be used against you." },
  { hint: "Salinas creates real risk.", explanation: "Unless you clearly say you're invoking the right, silence before Miranda can potentially be used at trial." },
  { hint: "It's about testimony.", explanation: "The right protects you from being forced to give testimonial evidence — from talking to police to testifying at trial." },
  { hint: "Two triggers.", explanation: "Custody + interrogation together triggers full Miranda protection; either alone doesn't." },
  { hint: "Before custody, no Miranda needed.", explanation: "Pre-custody statements are generally admissible even without warnings — Miranda only covers custodial interrogation." },
  { hint: "Testimonial vs. physical.", explanation: "The Fifth protects what you say and think — not physical evidence like blood, prints, or DNA." },
  { hint: "Physical evidence isn't testimony.", explanation: "Fingerprints, DNA, and lineups aren't covered — the Fifth is about compelled speech." },
  { hint: "You can invoke mid-questioning.", explanation: "Even after starting to answer, you can invoke silence and questioning must stop." },
  { hint: "It's declining to answer, not admitting.", explanation: "Pleading the Fifth means refusing to answer because a truthful answer could incriminate you — it isn't a confession." },
  { hint: "Immunity swaps testimony for protection.", explanation: "Grants of use immunity mean your compelled answer can't be used to prosecute you criminally." },
  { hint: "Same principles at the grand jury.", explanation: "You can invoke the Fifth in front of a grand jury just as you can in court, if your answers could incriminate you." },
  { hint: "Volunteering information rarely helps.", explanation: "Statements made to \"explain\" almost always become evidence and rarely change outcomes." },
  { hint: "Miranda meant it literally.", explanation: "Even benign-sounding statements can be twisted into evidence — invoking silence is the safest path." },
  { hint: "Voluntariness is required.", explanation: "Any confession the government wants to use must be voluntary — coerced statements are excluded." },

  // ---------- SECTION 3 — SIXTH AMENDMENT (31-40) ----------
  { hint: "Trial rights — including counsel.", explanation: "The Sixth Amendment guarantees the right to a lawyer when you're being prosecuted criminally." },
  { hint: "Don't wait until court.", explanation: "The right to counsel kicks in early — invoke it as soon as you face custodial questioning." },
  { hint: "Edwards v. Arizona — once invoked, questioning ends.", explanation: "Once you clearly ask for a lawyer, officers must stop interrogating until counsel is present." },
  { hint: "Real advocacy matters.", explanation: "A lawyer helps you navigate rights, negotiate, and avoid mistakes that could damage your case." },
  { hint: "Gideon guarantees appointed counsel.", explanation: "If you can't afford a lawyer, the court will appoint one when your liberty is at stake." },
  { hint: "1966 was the turning point.", explanation: "Miranda v. Arizona formalized the right to counsel during custodial interrogation." },
  { hint: "Multiple Sixth Amendment guarantees.", explanation: "Speedy trial, public trial, impartial jury, and confrontation of witnesses are all Sixth Amendment rights." },
  { hint: "Showing up isn't enough.", explanation: "Strickland v. Washington requires that counsel actually perform competently, not just be present." },
  { hint: "Waivers must be careful.", explanation: "You can waive counsel, but knowingly and voluntarily — and it's usually a serious mistake." },
  { hint: "Edwards v. Arizona.", explanation: "Once you invoke counsel, officers can't re-approach you about that offense unless you initiate contact." },

  // ---------- SECTION 4 — MIRANDA (41-50) ----------
  { hint: "Both conditions must be true.", explanation: "Officers don't have to Mirandize you on every contact — only when you're in custody AND being interrogated." },
  { hint: "Miranda only affects statements, not the whole case.", explanation: "If no statements were taken during interrogation, there's nothing to suppress under Miranda — the case can still proceed." },
  { hint: "Four required elements.", explanation: "Miranda warnings must cover silence, use against you, right to a lawyer, and appointed counsel if you can't afford one." },
  { hint: "Three requirements.", explanation: "A valid Miranda waiver must be knowing, intelligent, and voluntary — a rushed 'yes' isn't enough." },
  { hint: "Invocation can come mid-question.", explanation: "The right can be invoked at any time; officers must stop as soon as it's clearly invoked." },
  { hint: "Emergency exception.", explanation: "Quarles allows brief unwarned questioning when public safety requires immediate answers." },
  { hint: "Not every stop triggers Miranda.", explanation: "Routine traffic stops aren't 'custody' for Miranda purposes; statements made there are usually admissible." },
  { hint: "Volunteered means unprompted.", explanation: "If you talk without being interrogated, Miranda doesn't apply — it protects against compelled speech only." },
  { hint: "Both together.", explanation: "Miranda kicks in only when both custody and interrogation exist together." },
  { hint: "Ambiguity fails.", explanation: "\"Maybe I should have a lawyer\" isn't enough — courts require clear invocation to stop questioning." },

  // ---------- SECTION 5 — STANDARDS OF PROOF (51-60) ----------
  { hint: "Higher standard than a hunch.", explanation: "Probable cause requires specific facts that would lead a reasonable person to believe a crime has occurred." },
  { hint: "Enough to investigate, not enough to arrest.", explanation: "Reasonable suspicion (Terry v. Ohio) lets officers briefly detain you to investigate, but isn't enough to arrest or search fully." },
  { hint: "Named after the founding case.", explanation: "Terry v. Ohio (1968) is where the Supreme Court authorized brief investigative stops based on reasonable suspicion." },
  { hint: "Weapons frisk requires danger suspicion.", explanation: "A frisk (pat-down for weapons) needs its own reasonable suspicion of being armed and dangerous." },
  { hint: "Higher bar than Terry.", explanation: "Probable cause is the standard for warrants, arrests, and full searches — more than reasonable suspicion." },
  { hint: "Specific and articulable.", explanation: "Officers must be able to point to specific facts that support reasonable suspicion — a hunch isn't enough." },
  { hint: "Corroboration matters.", explanation: "An anonymous tip alone is usually insufficient; corroborated details make it stronger." },
  { hint: "All facts together.", explanation: "Courts look at the whole picture, weighing every fact rather than isolating any one." },
  { hint: "Low bar to initiate a stop.", explanation: "A traffic infraction observed by an officer is enough reasonable suspicion to justify the stop." },
  { hint: "Traffic stops have a purpose.", explanation: "Rodriguez holds that police can't prolong a stop beyond its original mission without new reasonable suspicion." },

  // ---------- SECTION 6 — CONSENT (61-70) ----------
  { hint: "Casual phrasing can carry real legal weight.", explanation: "Once you agree, you've waived your Fourth Amendment objection for that search. Be careful with casual yeses." },
  { hint: "Coercion invalidates consent.", explanation: "Consent must be freely given — threats, false claims of authority, or duress make it invalid." },
  { hint: "You can pull consent back.", explanation: "Clear verbal revocation ends the consent — officers must stop unless they have another legal basis." },
  { hint: "Consent needs affirmative agreement.", explanation: "Silence is ambiguous; consent requires a clear signal of agreement." },
  { hint: "False authority = no valid consent.", explanation: "If officers lie about having a warrant, consent given based on that lie is usually invalid." },
  { hint: "Depends on age and authority.", explanation: "A young child usually can't consent for the household; a teenager's consent depends on the situation." },
  { hint: "Common areas vs. private spaces.", explanation: "Roommates can generally consent to common areas but not to another person's private space." },
  { hint: "Present objection wins.", explanation: "Georgia v. Randolph: a co-resident's physical objection generally defeats another resident's consent." },
  { hint: "Say it out loud.", explanation: "During a frisk or pat-down, verbally stating non-consent to a broader search protects your rights." },
  { hint: "Casual language carries legal weight.", explanation: "\"Sure, whatever\" is often treated as consent — be intentional with your words during searches." },

  // ---------- SECTION 7 — DETENTION vs ARREST vs FREE (71-80) ----------
  { hint: "Two answers, two very different sets of rights.", explanation: "The answer flips the encounter between consensual (you can leave) and detention (rights kick in, you must stay)." },
  { hint: "Free to walk away.", explanation: "A consensual encounter isn't a detention — you can leave any time and don't have to answer." },
  { hint: "Middle ground.", explanation: "A detention is a limited restraint requiring reasonable suspicion — less than arrest." },
  { hint: "Higher standard.", explanation: "Arrest requires probable cause and typically means custody at a station or in a vehicle." },
  { hint: "Handcuffs are a factor, not automatic.", explanation: "Handcuffing is one factor in whether an encounter is a de facto arrest — courts look at the whole context." },
  { hint: "Objective test, not the officer's intent.", explanation: "Courts ask whether a reasonable person in the same shoes would have felt free to leave." },
  { hint: "Limited investigation only.", explanation: "During a detention, officers can ask questions and investigate briefly — full searches need more." },
  { hint: "Some states require ID.", explanation: "In states with stop-and-identify laws, providing name/ID during lawful detention is required." },
  { hint: "Circumstances can change.", explanation: "If officers block your path, take your ID, or use commanding language, a consensual encounter can become a detention." },
  { hint: "Traffic stops have a purpose.", explanation: "Rodriguez v. United States: officers can't prolong a stop beyond its original purpose without new suspicion." },

  // ---------- SECTION 8 — RECORDING (81-85) ----------
  { hint: "Protected speech.", explanation: "Federal courts hold that recording police in public is protected expression under the First Amendment." },
  { hint: "First Amendment cover.", explanation: "As long as you don't physically interfere, recording is treated as protected activity in most federal circuits." },
  { hint: "Physical blocking = interference.", explanation: "Just holding a camera nearby isn't interference; getting in the officer's way is." },
  { hint: "The street is not the courtroom.", explanation: "The roadside is the worst place to win an argument. Compliance keeps you safe; the court is where rights get vindicated." },
  { hint: "State law varies for audio.", explanation: "Video is broadly legal in public; audio recording of private conversations depends on your state's consent law." },

  // ---------- SECTION 9 — VIRGINIA SPECIFIC (86-90) ----------
  { hint: "Virginia has no broad 'stop and identify' statute.", explanation: "States vary on stop-and-identify laws. In Virginia, pedestrians not lawfully detained generally don't have to provide a name." },
  { hint: "Driving is a privilege, not a right.", explanation: "Operating a vehicle is a regulated privilege; producing your license on request is part of that bargain." },
  { hint: "Personal possession is legal but public use is not.", explanation: "Virginia permits limited personal possession but continues to prohibit public use, sale, and impaired driving." },
  { hint: "Open carry allowed with limits.", explanation: "Virginia generally allows open carry, but bans it in schools, courthouses, and other specific places." },
  { hint: "Refusal has automatic consequences.", explanation: "Virginia's implied consent law makes chemical-testing refusal after lawful DUI arrest carry its own penalties." },

  // ---------- SECTION 10 — WHEN VIOLATED (91-100) ----------
  { hint: "It's analyzed as an unreasonable seizure.", explanation: "Graham v. Connor: excessive force claims arise under the Fourth Amendment's reasonable seizure standard." },
  { hint: "Use the system designed for it.", explanation: "Internal affairs, civilian review boards, and civil rights lawsuits are the legal remedies for rights violations." },
  { hint: "Federal civil rights statute.", explanation: "42 U.S.C. § 1983 allows lawsuits for constitutional violations by state actors." },
  { hint: "It's a defense doctrine.", explanation: "Qualified immunity blocks personal liability unless the officer violated 'clearly established' law." },
  { hint: "Specialists for specialists.", explanation: "Civil rights attorneys understand the doctrines and procedures — start with them for serious violations." },
  { hint: "State personal injury clock.", explanation: "Section 1983 claims borrow the state's personal injury limitations period — usually 1-3 years." },
  { hint: "Preserve everything.", explanation: "Photos, videos, witness contacts, medical records, and detailed notes make later claims viable." },
  { hint: "Documentation matters over time.", explanation: "Even without immediate action, a written complaint on record can matter later." },
  { hint: "Records requests are powerful.", explanation: "FOIA and state open-records requests can pull body-cam footage, reports, and policies useful in your case." },
  { hint: "Rights need to be exercised.", explanation: "Knowing your rights is half the battle — invoking them clearly and calmly is the other half." }
];
