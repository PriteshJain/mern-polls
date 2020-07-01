import React from "react";
import {
  useParams
} from "react-router-dom";

function usePoll(initChoices) {
  const [state, setState] = React.useState(initChoices);

  function setChoices(choices) {
    setState(choices);
  }

  return [state, setChoices];
}

function useTotalOf(choices) {
    const [state, setState] = React.useState(0);
  
    React.useEffect(
      () => {
        let getTotal = choices.reduce((prev, curr) => {
          return prev + curr.votes;
        }, 0);
        setState(getTotal);
      },
      [choices]
    );
  
    return state;
}  

function Poll({poll}) {
    let { id } = useParams();
    const [picked, setPicked] = React.useState(false);
    const [choices, setChoices] = usePoll([]);
    const votes = useTotalOf(choices);
  
    React.useEffect(
      () => {
        if (poll.choices.length > 2) {
          let error = new Error("Poll must contain only 2 choices");
          console.error(error.message);
          throw error;
        } else {
          setChoices(poll.choices);
        }
      },
      (poll)
    );
  
    function vote(choice) {
      let votedChoice = choices.map(c => {
        if (c.name === choice.name) {
          return { ...c, votes: c.votes + 1, classes: [...c.classes, "active"] };
        }
        return c;
      });
      setChoices(votedChoice);
      setPicked(true);
    }
  
    return (
        <div class="pool">
            <div className="pollTitle">{poll.title}</div>
            <div className="pollChoices">        
                {choices.map((choice, i) => {
                let percentage = Math.round((choice.votes / votes) * 100);
                let classNames = choice.classes.join(" ");
                return (
                    <button
                    type="button"
                    className={classNames}
                    onClick={() => vote(choice)}
                    disabled={picked}
                    key={i}
                    >
                    <p>{choice.name}</p>
                    {picked && <p>{percentage}%</p>}
                    </button>
                );
                })}
            </div>
      </div>
    );
  }
  
  export default Poll;
