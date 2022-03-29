import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
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
import { selectFormById } from './formsSlice'
import { useAppSelector } from './hooks'

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

function QuestionMetadata<T>(props: { question: Question<T> }) {
  const { question } = props

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
          onChange={() => {}}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="input-block"
          value={question.description || ''}
          onChange={() => {}}
        ></textarea>
      </div>
      <fieldset className="form-group">
        <label className="paper-switch-2">
          <input
            id="required"
            name="required"
            type="checkbox"
            checked={question.required}
            onChange={() => {}}
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
  const { question } = props

  return (
    <>
      <QuestionMetadata question={question} />
    </>
  )
}

function QuestionLongText(props: { question: Question<LongText> }) {
  const { question } = props

  return (
    <>
      <QuestionMetadata question={question} />
    </>
  )
}

function QuestionSingleChoice(props: { question: Question<SingleChoice> }) {
  const { question } = props

  return (
    <>
      <QuestionMetadata question={question} />
      <fieldset className="form-group">
        <legend>Choices:</legend>
        {question.definition.map((choice) => {
          return (
            <label key={choice.id} htmlFor={choice.id} className="paper-radio">
              <input
                type="radio"
                name="choice"
                id={choice.id}
                defaultValue={choice.value}
                disabled={true}
              />{' '}
              <span>{choice.value}</span>
            </label>
          )
        })}
      </fieldset>
    </>
  )
}

function QuestionMultipleChoice(props: { question: Question<MultipleChoice> }) {
  const { question } = props

  return (
    <>
      <QuestionMetadata question={question} />
      <fieldset className="form-group">
        <legend>Options:</legend>
        {question.definition.map((choice) => {
          return (
            <label key={choice.id} htmlFor={choice.id} className="paper-radio">
              <input
                type="checkbox"
                name="options"
                id={choice.id}
                defaultValue={choice.value}
                disabled={true}
              />{' '}
              <span>{choice.value}</span>
            </label>
          )
        })}
      </fieldset>
    </>
  )
}

function QuestionScale(props: { question: Question<Scale> }) {
  const { question } = props
  const definition = question.definition

  return (
    <>
      <QuestionMetadata question={question} />
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
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default FormQuestions
