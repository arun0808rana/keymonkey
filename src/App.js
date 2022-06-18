import React, { useEffect, useRef, useState } from "react";
import NkCream from "./assets/nk_cream.wav";
import "./App.css";

const wordList =
  "ff ddd ardle sed old disresir eld sadle tidiness ded sudded added tidit and ind indear aid ord red and endine suddle desiration syllan ayed lay syllan lays eyes sly aye syllanate nay sty eyes sty reynold lay try sly try say aye sly try lydiate sly say day nect rice ducter lucased licience ence recial neceit accidear rict dicular accide secons sic accend neceit dictine oncle ech adher charathe the ashall enhance coher othe sched she adher othe adher othin unhear chan enhear echurry enhan enheir neglect highly sagreach night cogettle regard sugges gig sagreat edge ang ung dign digin ung ligened ign right legards rom came some remans smily simit game nomy dam ominute community nume immed hom game lime rom inments deman hom rom dam mammong cops spers depercell repres impromined haps unpleasure amply lips supposs report employed separt reply cupatroduce debt tabilitte ember emberted table embly reby publigh lable unbecause build lobby obeyond debt subdue able hable habilite sake like lake bake ask cake like make take ask cake ask oaks take ask sake irks oakham unkneed ank oakham like bake lake take move gove movingle pove rever neve obviole envy pave move rever ever seven save civing obviole neve gave leve never vival law gown daws now down towed bow cows law rew how bowinto now thward news own always low saw unword toware how thwardia alway coff defit befor muffect enfor left affliciety muffice puffeel miffer puffect puffere unfor infusion unfor left unfor dazzle hazard gaze gazeme dazzling gaze dozen gaze dazzle gazed puzzle dozen size puzzle hazard size hazard lizzy dazzle examlieve box six mixed sex box sixteem six oxfor foxhould mix foxhould vexacted vexact fixing mixten fixed vex mixing piquesday inquite unquit beques piquent equain piquesday sequal coque eques exquickham exquite acquaine inquiousand enjoyment enjoying injust enjoy dejection unjure deject enjoyment injust objection injure unjust object enjoy enjoymen noth with has convitate six any library two the how scertion being towarn him who invity gree happoing for told regreasure alled his then pyrammoved eve her the did all they the own out folly rection woman being ple the they gain saying surprise";

function App() {
  const audioRef = useRef();
  const [audioCtrl, setAudioCtrl] = useState();
  const [compensation, setCompensation] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [correctlyProcessedWords, setCorrectlyProcessedWords] = useState("");
  const [wrongLetter, setWrongLetter] = useState("");
  const [key, setKey] = useState("");

  const handleKeyDown = (e) => {
    audioRef.current.play();

    if (e.keyCode === 8) {
      setWrongLetter("");
      return;
    }

    const isKeyValid = (e.keyCode >= 65 && e.keyCode <= 90) || e.key === " ";

    if (!isKeyValid) {
      return;
    }

    // removes the keypress sound delays
    audioRef.current.currentTime = 0;

    setKey((prevKey) => {
      if (e.key === prevKey) {
        setCompensation((prevVal) => !prevVal);
      }
      return e.key;
    });
  };

  useEffect(() => {
    // return while intial render
    if (key === "") return;

    if (wordList.charAt(cursor) === key) {
      setCursor((prevVal) => prevVal + 1);
      setWrongLetter("");
    } else {
      setWrongLetter(wordList.charAt(cursor));
    }
  }, [key, compensation]);

  useEffect(() => {
    setCorrectlyProcessedWords(correctlyProcessedWords + key);
  }, [cursor]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    console.log(correctlyProcessedWords, " correctlyProcessedWords");
    console.log(wrongLetter, " wrongLetter");
    console.log(cursor, " cursor");
    console.log("======================");
  }, [cursor, wrongLetter, correctlyProcessedWords]);

  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex items-center justify-center w-full h-screen">
        <div className="test-container">
          <span className="correctlyProcessedWords relative">
            {correctlyProcessedWords}
            {wrongLetter ? <span className="wrongLetter">{key}</span> : null}
            <div className="absolute cursor-pos"></div>
          </span>
          {/* <span className="wrongLetter">{wrongLetter}</span> */}
          {wordList.substring(cursor, 300)}
        </div>
      </div>
      <audio className="hidden" ref={audioRef} id="audoctrl">
        <source
          src={NkCream}
          // type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default App;
