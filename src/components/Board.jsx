import { useState } from "react";
import { DEFAULT_CARDS } from "../constants";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  return (
    <div className="flex w-screen h-screen overflow-scroll p-12 gap-4">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

const Column = ({ title, headingColor, column, cards, setCards }) => {
  const [active, setActive] = useState(false);
  const filterdCards = cards.filter((c) => c.column === column);

  const onDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const indicators = getIndicators();
    const el = getNearestIndicator(e, indicators);
    clearIndicators(indicators);
    el.child.style.opacity = "1";
    setActive(true);
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const clearIndicators = () => {
    getIndicators().forEach((indicator) => {
      indicator.style.opacity = "0";
    });
  };

  const getNearestIndicator = (e, indicators) => {
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offest = e.clientY - box.y;
        if (offest >= 0 && offest < closest.offest) {
          return {
            offest,
            child,
          };
        } else {
          return closest;
        }
      },
      {
        offest: Infinity,
        child: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setActive(false);
    clearIndicators();
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearIndicators();

    const indicators = getIndicators();
    const { child: element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filterdCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filterdCards.map((c) => {
          return <Card key={c.id} {...c} onDragStart={onDragStart} />;
        })}
        <DropIndicator before={-1} column={column} />
        <AddCard setCards={setCards} column={column} />
      </div>
    </div>
  );
};

const Card = ({ title, id, column, onDragStart }) => {
  return (
    <>
      <DropIndicator before={id} column={column} />
      <div
        className="cursor-grap rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        draggable="true"
        onDragStart={(e) => onDragStart(e, { title, id, column })}
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </div>
    </>
  );
};

const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || -1}
      data-column={column}
      className="my-05 h-0.5 w-full bg-violet-400 opacity-0"
    ></div>
  );
};

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newCard = {
      column,
      id: Date.now(),
      title: text,
    };
    setCards((prev) => [...prev, newCard]);
    setAdding(false);
  };
  return (
    <>
      {adding ? (
        <form onSubmit={onSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          ></textarea>
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              type="submit"
              className="px-3 py-1.5 text-xs bg-neutral-100 text-neutral-600 rounded"
            >
              Add
            </button>
            <button
              className="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-100"
              onClick={(e) => {
                setAdding(false);
              }}
            >
              Close
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>AddCard +</span>
        </button>
      )}
    </>
  );
};

const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

export default Board;
