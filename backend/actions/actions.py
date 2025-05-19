from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionCheckSpelling(Action):
    def name(self) -> Text:
        return "action_check_spelling"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        misspelled_word = tracker.get_slot("misspelled_word")
        incorrect_word = tracker.get_slot("incorrect_word")
        intent = tracker.latest_message['intent'].get('name')

        if intent == "submit_error_leccion5":
            commonMistakes = {
                'abrol': 'árbol',
                'montana': 'montaña',
                'nubes': 'nube',
                'ceilo': 'cielo',
                'hierbas': 'hierba',
                'paisage': 'paisaje',
                'asul': 'azul',
                'amariyo': 'amarillo',
                'verdes': 'verde',
                'sole': 'sol',
            }
            correct_word = commonMistakes.get(misspelled_word.lower() if misspelled_word else '', "desconocida")
        elif intent == "submit_error_leccion2":
            commonMistakes = {
                'camaeleon': 'camaleón',
                'camaleon': 'camaleón',
                'aninal': 'animal',
                'animal': 'animal',
            }
            correct_word = commonMistakes.get(misspelled_word.lower() if misspelled_word else '', "desconocida")
        elif intent == "submit_error_leccion3":
            commonMistakes = {
                'comlpetamente': 'completamente',
                'compleatmente': 'completamente',
                'conpletametne': 'completamente',
                'completamenet': 'completamente',
            }
            correct_word = commonMistakes.get(misspelled_word.lower() if misspelled_word else '', "desconocida")
        elif intent == "submit_error_leccion4":
            commonMistakes = {
                'pero': 'perro',
                'corecto': 'correcto',
                'elephante': 'elefante',
                'espego': 'espejo',
            }
            correct_word = commonMistakes.get(misspelled_word.lower() if misspelled_word else '', "desconocida")
        elif intent == "submit_error_leccion1":
            correct_word = "CONTRAER"
        else:
            correct_word = "desconocida"

        print(f'ActionCheckSpelling: intent={intent}, misspelled_word={misspelled_word}, incorrect_word={incorrect_word}, correct_word={correct_word}')
        return [SlotSet("correct_word", correct_word), SlotSet("incorrect_word", incorrect_word)]

class ActionExplainError(Action):
    def name(self) -> Text:
        return "action_explain_error"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        misspelled_word = tracker.get_slot("misspelled_word")
        incorrect_word = tracker.get_slot("incorrect_word")
        correct_word = tracker.get_slot("correct_word")
        intent = tracker.latest_message['intent'].get('name')

        print(f'ActionExplainError: intent={intent}, misspelled_word={misspelled_word}, incorrect_word={incorrect_word}, correct_word={correct_word}')

        if intent == "submit_error_leccion5":
            dispatcher.utter_message(response="utter_explain_leccion5", misspelled_word=misspelled_word, correct_word=correct_word)
        elif intent == "submit_error_leccion2":
            dispatcher.utter_message(response="utter_explain_leccion2", misspelled_word=misspelled_word, correct_word=correct_word)
        elif intent == "submit_error_leccion3":
            dispatcher.utter_message(response="utter_explain_leccion3", misspelled_word=misspelled_word, correct_word=correct_word)
        elif intent == "submit_error_leccion4":
            dispatcher.utter_message(response="utter_explain_leccion4", misspelled_word=misspelled_word, correct_word=correct_word)
        elif intent == "submit_error_leccion1":
            dispatcher.utter_message(response="utter_explain_leccion1", incorrect_word=incorrect_word, correct_word=correct_word)
        elif intent == "ask_help":
            dispatcher.utter_message(response="utter_ask_help", misspelled_word=misspelled_word, incorrect_word=incorrect_word, correct_word=correct_word)
        else:
            dispatcher.utter_message(text=f"No reconozco el error. La palabra correcta es '{correct_word}'. ¿Necesitas más ayuda?")
        
        return []