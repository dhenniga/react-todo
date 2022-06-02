import styled from 'styled-components'

export const NoteContainer = styled.div`
  width: calc(100% - 55px);
  padding: 15px 15px 5px 15px;
  background-color: rgba(${props => props.theme.task.taskNoteBGColor});
  position:relative;
  right: -25px;
  margin-top: -5px;
  margin-bottom: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const NoteText = styled.textarea`
  font-family: rc_regular;
  font-weight: 300;
  font-size: 11px;
  color: rgba(${props => props.theme.task.taskNoteTextColor});
  resize: none;
  width: 100%;
  background-color: transparent;
  outline: 0;
  border: 0;
  min-height: 20px;
  height: inherit;
  transition: 0.3s cubic-bezier(0.5, 0.2, 0, 1);
  transition-property: height;
  line-height: 14px;
`;
