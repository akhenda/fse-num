/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: { input: any; output: any; }
};

export type ExistingLoanPayments = {
  __typename?: 'ExistingLoanPayments';
  id?: Maybe<Scalars['Int']['output']>;
  loanId?: Maybe<Scalars['Int']['output']>;
  paymentDate?: Maybe<Scalars['Date']['output']>;
};

export type ExistingLoans = {
  __typename?: 'ExistingLoans';
  dueDate?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  interestRate?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  principal?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  loanPayments?: Maybe<Array<Maybe<ExistingLoanPayments>>>;
  loans?: Maybe<Array<Maybe<ExistingLoans>>>;
};
