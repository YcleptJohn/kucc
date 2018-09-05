import React, { Component } from 'react'
import CommitteeMemberTile from '../components/CommitteeMemberTile.js'
import { Container, Segment, Card } from 'semantic-ui-react'


class CommitteePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.state.data = [
      {
        name: "John Taylor",
        roles: ["President", "Training & Safety Officer"],
        description: "Being in the club for 3 years now...?",
        email: "jjt24@kent.ac.uk",
        facebook: "f.com/john.taylor"
      },
      {
        name: "Elif Okutan",
        roles: ["Secretary"],
        description: "She came from the bottom now she here...",
        email: "eno3@kent.ac.uk",
        facebook: "f.com/elif.okutan"
      },
      {
        name: "Elif Okutan",
        roles: ["Secretary"],
        description: "She came from the bottom now she here...",
        email: "eno3@kent.ac.uk",
        facebook: "f.com/elif.okutan"
      },
      {
        name: "Elif Okutan",
        roles: ["Secretary"],
        description: "She came from the bottom now she here...",
        email: "eno3@kent.ac.uk",
        facebook: "f.com/elif.okutan"
      },
      {
        name: "Elif Okutan",
        roles: ["Secretary"],
        description: "She came from the bottom now she here...",
        email: "eno3@kent.ac.uk",
        facebook: "f.com/elif.okutan"
      }
    ]
  }

  render () {
    const { data } = this.state

    return (
      <div>
        <Container as={Segment}>
          {data.map((d, i) => <CommitteeMemberTile key={'member-' + i} data={d} />)}
        </Container>
      </div>
    )
  }
}

export default CommitteePage
