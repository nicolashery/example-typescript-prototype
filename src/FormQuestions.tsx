import { useState } from 'react'
import { useParams } from 'react-router-dom'
import produce from 'immer'
import {
  allQuestionTypes,
  FormId,
  FormQuestion,
  LongText,
  MultipleChoice,
  Question,
  QuestionType,
  Scale,
  ShortText,
  SingleChoice,
} from './form'
import { questionAdded, selectFormById } from './formsSlice'
import { useAppDispatch, useAppSelector } from './hooks'

type Params = {
  formId: FormId
}

function FormQuestions() {
  const params = useParams() as Params
  const form = useAppSelector((state) => selectFormById(state, params.formId))

  return (
    <>
      {form.questions.map((formQuestion) => (
        <QuestionCard
          key={formQuestion.question.id}
          formQuestion={formQuestion}
        />
      ))}
      <QuestionNew formId={params.formId} />
    </>
  )
}

function showQuestionType(questionType: QuestionType): string {
  switch (questionType) {
    case 'shortText':
      return 'Short text'
    case 'longText':
      return 'Long text'
    case 'singleChoice':
      return 'Single choice'
    case 'multipleChoice':
      return 'Multiple choice'
    case 'scale':
      return 'Scale'
  }
}

function QuestionCard(props: { formQuestion: FormQuestion }) {
  const { tag, question } = props.formQuestion

  const renderQuestion = (): JSX.Element => {
    switch (tag) {
      case 'shortText':
        return <QuestionShortText question={question} />
      case 'longText':
        return <QuestionLongText question={question} />
      case 'singleChoice':
        return <QuestionSingleChoice question={question} />
      case 'multipleChoice':
        return <QuestionMultipleChoice question={question} />
      case 'scale':
        return <QuestionScale question={question} />
    }
  }

  return (
    <div className="card margin-bottom">
      <div className="card-body">
        <h5 className="card-subtitle">{showQuestionType(tag)}</h5>
        <form>{renderQuestion()}</form>
      </div>
    </div>
  )
}

function QuestionMetadata<T>(props: {
  question: Question<T>
  onQuestionChange?: (question: Question<T>) => void
}) {
  const { question, onQuestionChange } = props
  const readOnly = !onQuestionChange

  const handleTitleChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = onQuestionChange
    ? (e) =>
        onQuestionChange(
          produce(question, (draft) => {
            draft.title = e.target.value
          })
        )
    : undefined

  const handleDescriptionChange:
    | React.ChangeEventHandler<HTMLTextAreaElement>
    | undefined = onQuestionChange
    ? (e) =>
        onQuestionChange(
          produce(question, (draft) => {
            draft.description = e.target.value
          })
        )
    : undefined

  const handleRequiredChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = onQuestionChange
    ? (e) =>
        onQuestionChange(
          produce(question, (draft) => {
            draft.required = e.target.checked
          })
        )
    : undefined

  return (
    <>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="input-block"
          value={question.title}
          onChange={handleTitleChange}
          readOnly={readOnly}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="input-block"
          value={question.description || ''}
          onChange={handleDescriptionChange}
          readOnly={readOnly}
        ></textarea>
      </div>
      <fieldset className="form-group">
        <label className="paper-switch-2">
          <input
            id="required"
            name="required"
            type="checkbox"
            checked={question.required}
            onChange={handleRequiredChange}
            readOnly={readOnly}
          />
          <span className="paper-switch-slider round" />
        </label>
        <label htmlFor="required" className="paper-switch-2-label">
          Required
        </label>
      </fieldset>
    </>
  )
}

function QuestionShortText(props: {
  question: Question<ShortText>
  onQuestionChange?: (question: Question<ShortText>) => void
}) {
  const { question, onQuestionChange } = props

  return (
    <>
      <QuestionMetadata
        question={question}
        onQuestionChange={onQuestionChange}
      />
    </>
  )
}

function QuestionLongText(props: {
  question: Question<LongText>
  onQuestionChange?: (question: Question<LongText>) => void
}) {
  const { question, onQuestionChange } = props

  return (
    <>
      <QuestionMetadata
        question={question}
        onQuestionChange={onQuestionChange}
      />
    </>
  )
}

function QuestionSingleChoice(props: {
  question: Question<SingleChoice>
  onQuestionChange?: (question: Question<SingleChoice>) => void
}) {
  const { question, onQuestionChange } = props

  return (
    <>
      <QuestionMetadata
        question={question}
        onQuestionChange={onQuestionChange}
      />
      <fieldset className="form-group">
        <legend>Choices:</legend>
        {question.definition.map((choice) => {
          return (
            <label key={choice.id} htmlFor={choice.id} className="paper-radio">
              <input
                type="radio"
                name="choice"
                id={choice.id}
                value={choice.value}
                readOnly={true}
              />{' '}
              <span>{choice.value}</span>
            </label>
          )
        })}
      </fieldset>
    </>
  )
}

function QuestionMultipleChoice(props: {
  question: Question<MultipleChoice>
  onQuestionChange?: (question: Question<MultipleChoice>) => void
}) {
  const { question, onQuestionChange } = props

  return (
    <>
      <QuestionMetadata
        question={question}
        onQuestionChange={onQuestionChange}
      />
      <fieldset className="form-group">
        <legend>Options:</legend>
        {question.definition.map((choice) => {
          return (
            <label key={choice.id} htmlFor={choice.id} className="paper-radio">
              <input
                type="checkbox"
                name="options"
                id={choice.id}
                value={choice.value}
                readOnly={true}
              />{' '}
              <span>{choice.value}</span>
            </label>
          )
        })}
      </fieldset>
    </>
  )
}

function QuestionScale(props: {
  question: Question<Scale>
  onQuestionChange?: (question: Question<Scale>) => void
}) {
  const { question, onQuestionChange } = props
  const definition = question.definition

  return (
    <>
      <QuestionMetadata
        question={question}
        onQuestionChange={onQuestionChange}
      />
      <div className="row">
        <div className="col sm-4 padding-none">
          <div className="form-group">
            <label htmlFor="start">Start</label>
            <input
              type="number"
              id="start"
              name="start"
              className="input-block"
              value={definition.start}
              onChange={() => {}}
              readOnly={true}
            />
          </div>
        </div>
        <div className="col sm-8 padding-none">
          <div className="form-group">
            <label htmlFor="startLabel">Start label</label>
            <input
              type="text"
              id="startLabel"
              name="startLabel"
              className="input-block"
              value={definition.startLabel}
              onChange={() => {}}
              readOnly={true}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col sm-4 padding-none">
          <div className="form-group">
            <label htmlFor="end">End</label>
            <input
              type="number"
              id="end"
              name="end"
              className="input-block"
              value={definition.end}
              onChange={() => {}}
              readOnly={true}
            />
          </div>
        </div>
        <div className="col sm-8 padding-none">
          <div className="form-group">
            <label htmlFor="endLabel">End label</label>
            <input
              type="text"
              id="endLabel"
              name="endLabel"
              className="input-block"
              value={definition.endLabel}
              onChange={() => {}}
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </>
  )
}

function QuestionNew(props: { formId: FormId }) {
  const { formId } = props
  const dispatch = useAppDispatch()

  const [showQuestionNew, setShowQuestionNew] = useState(false)

  const initialFormQuestion: FormQuestion = newFormQuestion('shortText')

  const [questionType, setQuestionType] = useState<QuestionType>(
    initialFormQuestion.tag
  )
  const onQuestionTypeChanged: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const type = e.target.value as QuestionType
    setQuestionType(type)
    setFormQuestion(newFormQuestion(type))
  }

  const [formQuestion, setFormQuestion] =
    useState<FormQuestion>(initialFormQuestion)

  const resetForm = () => {
    setQuestionType(initialFormQuestion.tag)
    setFormQuestion(initialFormQuestion)
  }

  const onCancel: React.MouseEventHandler = (e) => {
    e.preventDefault()
    setShowQuestionNew(false)
    resetForm()
  }

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()

    setShowQuestionNew(false)
    resetForm()

    dispatch(questionAdded(formId, formQuestion))
  }

  if (!showQuestionNew) {
    return (
      <p className="row flex-right">
        <button
          className="btn-primary"
          onClick={() => setShowQuestionNew(true)}
        >
          Add question
        </button>
      </p>
    )
  }

  const renderQuestion = (): JSX.Element => {
    switch (formQuestion.tag) {
      case 'shortText':
        return (
          <QuestionShortText
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'shortText', question: question })
            }
          />
        )
      case 'longText':
        return (
          <QuestionLongText
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'longText', question: question })
            }
          />
        )
      case 'singleChoice':
        return (
          <QuestionSingleChoice
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'singleChoice', question: question })
            }
          />
        )
      case 'multipleChoice':
        return (
          <QuestionMultipleChoice
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'multipleChoice', question: question })
            }
          />
        )
      case 'scale':
        return (
          <QuestionScale
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'scale', question: question })
            }
          />
        )
    }
  }

  return (
    <div className="card margin-bottom">
      <div className="card-body">
        <h5 className="card-subtitle">New question</h5>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="questionType">Question type</label>
            <select
              id="questionType"
              value={questionType}
              onChange={onQuestionTypeChanged}
            >
              {allQuestionTypes.map((type) => (
                <option key={type} value={type}>
                  {showQuestionType(type)}
                </option>
              ))}
            </select>
          </div>
          {renderQuestion()}
          <div className="row flex-right">
            <input
              type="button"
              className="paper-btn margin-right"
              onClick={onCancel}
              value="Cancel"
            />
            <input
              type="submit"
              className="paper-btn btn-primary"
              value="Add"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

const newFormQuestion = (questionType: QuestionType): FormQuestion => {
  switch (questionType) {
    case 'shortText':
      return {
        tag: 'shortText',
        question: {
          id: '<new>',
          title: '',
          description: '',
          required: true,
          definition: null,
        },
      }
    case 'longText':
      return {
        tag: 'longText',
        question: {
          id: '<new>',
          title: '',
          description: '',
          required: true,
          definition: null,
        },
      }
    case 'singleChoice':
      return {
        tag: 'singleChoice',
        question: {
          id: '<new>',
          title: '',
          description: '',
          required: true,
          definition: [],
        },
      }
    case 'multipleChoice':
      return {
        tag: 'multipleChoice',
        question: {
          id: '<new>',
          title: '',
          description: '',
          required: true,
          definition: [],
        },
      }
    case 'scale':
      return {
        tag: 'scale',
        question: {
          id: '<new>',
          title: '',
          description: '',
          required: true,
          definition: {
            start: 1,
            end: 5,
            startLabel: '',
            endLabel: '',
          },
        },
      }
  }
}

export default FormQuestions
