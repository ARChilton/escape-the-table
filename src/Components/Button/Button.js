import { memo } from 'react'
import styled from '@emotion/styled'
import { loader } from '../../css/animations'

const BaseButton = styled('button')`
  label: button;
  pointer-events: ${props => (props.loading ? 'none' : 'auto')};
  min-height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  /* white-space: nowrap; */
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.84615385;
  border-radius: 3px;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  text-transform: capitalize;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.03em;
  font-size: 0.8125rem;
  min-width: 2.375rem;
  color: ${props => (props.loading ? 'transparent' : 'rgba(0, 0, 0, 0.7)')};
  background-color: #fff;
  border-color: rgba(0, 0, 0, 0.15);
  :hover {
    background-color: rgba(0, 0, 0, 0.15);
    border-color: rgba(0, 0, 0, 0.3);
    text-decoration: none;
  }
  :focus {
    outline: none;
  }
  :after {
    content: ${props => (props.loading ? `''` : null)};
    -webkit-animation: ${loader} 500ms infinite linear;
    animation: ${loader} 500ms infinite linear;
    border: 2px solid #fff;
    border-radius: 50%;
    border-color: ${props =>
      props.loading ? 'rgba(0, 0, 0, 0.7)' : 'transparent'};
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    display: block;
    height: 16px;
    width: 16px;
    left: calc(50% - (1.3em / 2));
    top: calc(50% - (1.3em / 2));
    -webkit-transform-origin: center;
    transform-origin: center;
    position: absolute;
    padding: 2px;
  }
  :disabled {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }
`

const BaseSmallButton = styled(BaseButton)`
  @media (min-width: 992px) {
    font-size: 0.75rem;
    min-width: 1.625rem;
    padding: 0.25rem 0.5rem;
    line-height: 1.33333333;
    min-height: 27px;
    letter-spacing: 0.03em;
  }
`

const BasePrimaryButton = styled(BaseButton)`
  background-color: ${props => props.theme.color.primary || 'inherit'};
  border-color: ${props => props.theme.color.primary || 'inherit'};
  color: ${props => (props.loading ? 'transparent' : '#fff')};
  :hover {
    background-color: ${props => props.theme.color.primaryHover || 'inherit'};
    border-color: ${props => props.theme.color.primaryHover || 'inherit'};
  }
  :after {
    border-color: ${props => (!props.loading ? 'transparent' : '#fff')};
  }
`

const BaseFixedPrimaryButton = styled(BaseButton)`
  background-color: ${props =>
    props.theme.color.l8logStatic.l8logPrimary || 'inherit'};
  border-color: ${props =>
    props.theme.color.l8logStatic.l8logPrimary || 'inherit'};
  color: ${props => (props.loading ? 'transparent' : '#fff')};
  :hover {
    background-color: ${props =>
      props.theme.color.l8logStatic.l8logPrimaryHover || 'inherit'};
    border-color: ${props =>
      props.theme.color.l8logStatic.l8logPrimaryHover || 'inherit'};
  }
  :after {
    border-color: ${props => (!props.loading ? 'transparent' : '#fff')};
  }
`

const BaseDangerButton = styled(BaseButton)`
  background-color: ${props => props.theme.color.danger || 'inherit'};
  border-color: ${props => props.theme.color.danger || 'inherit'};
  color: ${props => (props.loading ? 'transparent' : '#fff')};
  :hover {
    background-color: ${props => props.theme.color.dangerHover || 'inherit'};
    border-color: ${props => props.theme.color.dangerHover || 'inherit'};
  }
  :after {
    border-color: ${props => (!props.loading ? 'transparent' : '#fff')};
  }
`

const BaseClearButton = styled(BaseButton)`
  border-color: transparent;
  background-color: transparent;
  color: ${props => (props.loading ? 'transparent' : 'rgba(0, 0, 0, 0.45)')};

  :hover {
    background-color: transparent;
    border-color: transparent;
    color: ${props => (props.loading ? 'transparent' : 'rgba(0, 0, 0, 0.7)')};
  }
`

const BaseSmallClearButton = styled(BaseSmallButton)`
  border-color: transparent;
  background-color: transparent;
  color: ${props => (props.loading ? 'transparent' : 'rgba(0, 0, 0, 0.45)')};

  :hover {
    background-color: transparent;
    border-color: transparent;
    color: ${props => (props.loading ? 'transparent' : 'rgba(0, 0, 0, 0.7)')};
  }
`

export const Button = memo(BaseButton)
export const SmallButton = memo(BaseSmallButton)
export const PrimaryButton = memo(BasePrimaryButton)
export const DangerButton = memo(BaseDangerButton)
export const ClearButton = memo(BaseClearButton)
export const FixedPrimaryButton = memo(BaseFixedPrimaryButton)
export const SmallClearButton = memo(BaseSmallClearButton)
