import { useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import produce from 'immer'
import yaml from 'js-yaml'
import {
  allQuestionTypes,
  Choice,
  ChoiceId,
  FormId,
  FormQuestion,
  generateChoiceId,
  LongText,
  MultipleChoice,
  Question,
  QuestionType,
  Scale,
  ShortText,
  SingleChoice,
} from './form'
import {
  questionAdded,
  questionDeleted,
  questionUpdated,
  selectFormById,
} from './formsSlice'
import { useAppDispatch, useAppSelector } from './hooks'
import Code from './Code'

type Params = {
  formId: FormId
}

export function FormQuestionsLayout() {
  const params = useParams() as Params
  const form = useAppSelector((state) => selectFormById(state, params.formId))

  if (form.questions.length === 0) {
    return (
      <>
        <p>Your form doesn't have any questions yet.</p>
        <QuestionCreate formId={params.formId} />
      </>
    )
  }

  return (
    <>
      <FormQuestionsNav questionsCount={form.questions.length} />
      <Outlet />
    </>
  )
}

function FormQuestionsNav(props: { questionsCount: number }) {
  return (
    <nav className="subnav row flex-edges flex-middle">
      <div>
        Questions: <strong>{props.questionsCount}</strong>
      </div>
      <ul className="inline">
        <li>
          <NavLink to="list">List</NavLink>
        </li>
        <li>
          <NavLink to="yaml">YAML</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export function FormQuestionsList() {
  const params = useParams() as Params
  const form = useAppSelector((state) => selectFormById(state, params.formId))

  return (
    <>
      {form.questions.map((formQuestion) => (
        <QuestionCard
          key={formQuestion.question.id}
          formId={params.formId}
          formQuestion={formQuestion}
        />
      ))}
      <QuestionCreate formId={params.formId} />
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
    default:
      const _exhaustiveCheck: never = questionType
      return _exhaustiveCheck
  }
}

function QuestionCard(props: { formId: FormId; formQuestion: FormQuestion }) {
  const dispatch = useAppDispatch()

  const { formQuestion } = props

  const [showQuestionEdit, setQuestionEdit] = useState(false)

  let renderQuestion = (): JSX.Element => {
    switch (formQuestion.tag) {
      case 'shortText':
        return <QuestionShortText question={formQuestion.question} />
      case 'longText':
        return <QuestionLongText question={formQuestion.question} />
      case 'singleChoice':
        return <QuestionSingleChoice question={formQuestion.question} />
      case 'multipleChoice':
        return <QuestionMultipleChoice question={formQuestion.question} />
      case 'scale':
        return <QuestionScale question={formQuestion.question} />
      default:
        const _exhaustiveCheck: never = formQuestion
        return _exhaustiveCheck
    }
  }

  let editButton: JSX.Element | null = (
    <div className="text-right">
      <a
        href="#"
        className="inline-block"
        onClick={(e) => {
          e.preventDefault()
          setQuestionEdit(true)
        }}
      >
        Edit
      </a>
    </div>
  )

  if (showQuestionEdit) {
    renderQuestion = () => (
      <QuestionEdit
        formQuestion={props.formQuestion}
        onCancel={() => setQuestionEdit(false)}
        onSubmit={(formQuestion) => {
          setQuestionEdit(false)
          dispatch(
            questionUpdated({
              formId: props.formId,
              formQuestion: formQuestion,
            })
          )
        }}
        onDelete={() => {
          setQuestionEdit(false)
          dispatch(
            questionDeleted({
              formId: props.formId,
              questionId: props.formQuestion.question.id,
            })
          )
        }}
      />
    )

    editButton = null
  }

  return (
    <div className="card margin-bottom">
      <div className="card-body">
        <h5 className="card-subtitle">{showQuestionType(formQuestion.tag)}</h5>
        {renderQuestion()}
        {editButton}
      </div>
    </div>
  )
}

function QuestionMetadata<T>(props: { question: Question<T> }) {
  const { question } = props

  const requiredElement = question.required ? (
    <span className="text-danger"> *</span>
  ) : null

  const descriptionElement =
    question.description && question.description !== '' ? (
      <p className="text-small text-muted">{question.description}</p>
    ) : null

  return (
    <>
      <p>
        {question.title}
        {requiredElement}
      </p>
      {descriptionElement}
    </>
  )
}

function QuestionMetadataEdit<T>(props: {
  question: Question<T>
  onQuestionChange: (question: Question<T>) => void
}) {
  const { question, onQuestionChange } = props

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.title = e.target.value
      })
    )

  const handleDescriptionChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.description = e.target.value
      })
    )

  const handleRequiredChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.required = e.target.checked
      })
    )

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

function QuestionShortText(props: { question: Question<ShortText> }) {
  return (
    <>
      <QuestionMetadata question={props.question} />
      <div className="form-group">
        <input className="input-block" type="text" readOnly={true} />
      </div>
    </>
  )
}

function QuestionShortTextEdit(props: {
  question: Question<ShortText>
  onQuestionChange: (question: Question<ShortText>) => void
}) {
  const { question, onQuestionChange } = props

  return (
    <>
      <QuestionMetadataEdit
        question={question}
        onQuestionChange={onQuestionChange}
      />
    </>
  )
}

function QuestionLongText(props: { question: Question<LongText> }) {
  return (
    <>
      <QuestionMetadata question={props.question} />
      <div className="form-group">
        <textarea className="input-block" readOnly={true}></textarea>
      </div>
    </>
  )
}

function QuestionLongTextEdit(props: {
  question: Question<LongText>
  onQuestionChange: (question: Question<LongText>) => void
}) {
  const { question, onQuestionChange } = props

  return (
    <>
      <QuestionMetadataEdit
        question={question}
        onQuestionChange={onQuestionChange}
      />
    </>
  )
}

function QuestionSingleChoice(props: { question: Question<SingleChoice> }) {
  return (
    <>
      <QuestionMetadata question={props.question} />
      <fieldset className="form-group">
        {props.question.definition.map((choice) => {
          return (
            <label key={choice.id} className="paper-radio">
              <input type="radio" value={choice.value} disabled={true} />{' '}
              <span className="inline-block">{choice.value}</span>
            </label>
          )
        })}
      </fieldset>
    </>
  )
}

function QuestionSingleChoiceEdit(props: {
  question: Question<SingleChoice>
  onQuestionChange: (question: Question<SingleChoice>) => void
}) {
  const { question, onQuestionChange } = props

  const handleAddChoice = (choice: Choice) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition.push(choice)
      })
    )

  const newChoice = <NewChoice onAddChoice={handleAddChoice} />

  const handleRemoveChoice = (choiceId: ChoiceId) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition = draft.definition.filter(
          (choice) => choice.id !== choiceId
        )
      })
    )

  const removeChoice = (choiceId: ChoiceId) => (
    <a
      href="#"
      className="inline-block margin-left-small text-small"
      onClick={(e) => {
        e.preventDefault()
        handleRemoveChoice(choiceId)
      }}
    >
      Remove
    </a>
  )

  return (
    <>
      <QuestionMetadataEdit
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
                disabled={true}
              />{' '}
              <span className="inline-block">{choice.value}</span>
              {removeChoice(choice.id)}
            </label>
          )
        })}
      </fieldset>
      {newChoice}
    </>
  )
}

function QuestionMultipleChoice(props: { question: Question<MultipleChoice> }) {
  return (
    <>
      <QuestionMetadata question={props.question} />
      <fieldset className="form-group">
        {props.question.definition.map((choice) => {
          return (
            <label key={choice.id} className="paper-check">
              <input type="checkbox" value={choice.value} disabled={true} />{' '}
              <span className="inline-block">{choice.value}</span>
            </label>
          )
        })}
      </fieldset>
    </>
  )
}

function QuestionMultipleChoiceEdit(props: {
  question: Question<MultipleChoice>
  onQuestionChange: (question: Question<MultipleChoice>) => void
}) {
  const { question, onQuestionChange } = props

  const handleAddChoice = (choice: Choice) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition.push(choice)
      })
    )

  const newChoice = <NewChoice onAddChoice={handleAddChoice} />

  const handleRemoveChoice = (choiceId: ChoiceId) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition = draft.definition.filter(
          (choice) => choice.id !== choiceId
        )
      })
    )

  const removeChoice = (choiceId: ChoiceId) => (
    <a
      href="#"
      className="inline-block margin-left-small text-small"
      onClick={(e) => {
        e.preventDefault()
        handleRemoveChoice(choiceId)
      }}
    >
      Remove
    </a>
  )

  return (
    <>
      <QuestionMetadataEdit
        question={question}
        onQuestionChange={onQuestionChange}
      />
      <fieldset className="form-group">
        <legend>Choices:</legend>
        {question.definition.map((choice) => {
          return (
            <label key={choice.id} htmlFor={choice.id} className="paper-check">
              <input
                type="checkbox"
                name="choices"
                id={choice.id}
                value={choice.value}
                disabled={true}
              />{' '}
              <span className="inline-block">{choice.value}</span>
              {removeChoice(choice.id)}
            </label>
          )
        })}
      </fieldset>
      {newChoice}
    </>
  )
}

function NewChoice(props: { onAddChoice: (choice: Choice) => void }) {
  const [choiceValue, setChoiceValue] = useState('')
  const handleChoiceValueChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => setChoiceValue(e.target.value)

  const handleAddChoice: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setChoiceValue('')
    props.onAddChoice({
      id: generateChoiceId(),
      value: choiceValue,
    })
  }

  return (
    <div className="form-group">
      <input
        type="text"
        className="inline-block"
        placeholder="New choice"
        value={choiceValue}
        onChange={handleChoiceValueChange}
      />
      <button
        className="btn-small btn-primary margin-left-small"
        onClick={handleAddChoice}
      >
        Add choice
      </button>
    </div>
  )
}

function QuestionScale(props: { question: Question<Scale> }) {
  const definition = props.question.definition
  return (
    <>
      <QuestionMetadata question={props.question} />
      <div className="form-group">
        <div className="row">
          <div className="col sm-3 text-right">
            {`${definition.startLabel} (${definition.start})`}
          </div>
          <div className="col sm-6">
            <input
              className="input-block"
              type="range"
              min={definition.start}
              max={definition.end}
            />
          </div>
          <div className="col sm-3">
            {`(${definition.end}) ${definition.endLabel}`}
          </div>
        </div>
      </div>
    </>
  )
}

function QuestionScaleEdit(props: {
  question: Question<Scale>
  onQuestionChange: (question: Question<Scale>) => void
}) {
  const { question, onQuestionChange } = props
  const definition = question.definition

  const handleStartChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition.start = e.target.valueAsNumber
      })
    )

  const handleEndChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition.end = e.target.valueAsNumber
      })
    )

  const handleStartLabelChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition.startLabel = e.target.value
      })
    )

  const handleEndLabelChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) =>
    onQuestionChange(
      produce(question, (draft) => {
        draft.definition.endLabel = e.target.value
      })
    )

  return (
    <>
      <QuestionMetadataEdit
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
              onChange={handleStartChange}
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
              onChange={handleStartLabelChange}
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
              onChange={handleEndChange}
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
              onChange={handleEndLabelChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

function QuestionEdit(props: {
  formQuestion: FormQuestion
  onCancel: () => void
  onSubmit: (formQuestion: FormQuestion) => void
  onDelete: () => void
}) {
  const [formQuestion, setFormQuestion] = useState(props.formQuestion)

  const handleCancel: React.MouseEventHandler = (e) => {
    e.preventDefault()
    props.onCancel()
  }

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    props.onSubmit(formQuestion)
  }

  const handleDelete: React.MouseEventHandler = (e) => {
    e.preventDefault()
    props.onDelete()
  }

  const renderQuestion = (): JSX.Element => {
    switch (formQuestion.tag) {
      case 'shortText':
        return (
          <QuestionShortTextEdit
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'shortText', question: question })
            }
          />
        )
      case 'longText':
        return (
          <QuestionLongTextEdit
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'longText', question: question })
            }
          />
        )
      case 'singleChoice':
        return (
          <QuestionSingleChoiceEdit
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'singleChoice', question: question })
            }
          />
        )
      case 'multipleChoice':
        return (
          <QuestionMultipleChoiceEdit
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'multipleChoice', question: question })
            }
          />
        )
      case 'scale':
        return (
          <QuestionScaleEdit
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'scale', question: question })
            }
          />
        )
      default:
        const _exhaustiveCheck: never = formQuestion
        return _exhaustiveCheck
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {renderQuestion()}
      <div className="row flex-edges">
        <input
          type="button"
          className="paper-btn btn-danger"
          onClick={handleDelete}
          value="Delete"
        />
        <div>
          <input
            type="button"
            className="paper-btn margin-right"
            onClick={handleCancel}
            value="Cancel"
          />
          <input type="submit" className="paper-btn btn-primary" value="Save" />
        </div>
      </div>
    </form>
  )
}

function QuestionCreate(props: { formId: FormId }) {
  const { formId } = props
  const dispatch = useAppDispatch()

  const [showQuestionCreate, setShowQuestionCreate] = useState(false)

  const initialFormQuestion: FormQuestion = newFormQuestion('shortText')

  const [questionType, setQuestionType] = useState<QuestionType>(
    initialFormQuestion.tag
  )
  const handleQuestionTypeChanged: React.ChangeEventHandler<
    HTMLSelectElement
  > = (e) => {
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

  const handleCancel: React.MouseEventHandler = (e) => {
    e.preventDefault()
    setShowQuestionCreate(false)
    resetForm()
  }

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()

    setShowQuestionCreate(false)
    resetForm()

    dispatch(questionAdded(formId, formQuestion))
  }

  if (!showQuestionCreate) {
    return (
      <p className="row flex-right">
        <button
          className="btn-primary"
          onClick={() => setShowQuestionCreate(true)}
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
          <QuestionShortTextEdit
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'shortText', question: question })
            }
          />
        )
      case 'longText':
        return (
          <QuestionLongTextEdit
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'longText', question: question })
            }
          />
        )
      case 'singleChoice':
        return (
          <QuestionSingleChoiceEdit
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'singleChoice', question: question })
            }
          />
        )
      case 'multipleChoice':
        return (
          <QuestionMultipleChoiceEdit
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'multipleChoice', question: question })
            }
          />
        )
      case 'scale':
        return (
          <QuestionScaleEdit
            question={formQuestion.question}
            onQuestionChange={(question) =>
              setFormQuestion({ tag: 'scale', question: question })
            }
          />
        )
      default:
        const _exhaustiveCheck: never = formQuestion
        return _exhaustiveCheck
    }
  }

  return (
    <div className="card margin-bottom">
      <div className="card-body">
        <h5 className="card-subtitle">New question</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="questionType">Question type</label>
            <select
              id="questionType"
              value={questionType}
              onChange={handleQuestionTypeChanged}
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
              onClick={handleCancel}
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
    default:
      const _exhaustiveCheck: never = questionType
      return _exhaustiveCheck
  }
}

export function FormQuestionsYaml() {
  const params = useParams() as Params
  const form = useAppSelector((state) => selectFormById(state, params.formId))

  return <Code language="yaml" code={yaml.dump(form.questions)} />
}
