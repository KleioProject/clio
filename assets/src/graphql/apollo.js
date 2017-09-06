import ApolloClient, { createNetworkInterface } from 'apollo-client';


const networkInterface = createNetworkInterface( {
    uri: 'http://localhost:4040/graphql'
} );

const client = new ApolloClient( {
    networkInterface: networkInterface,
    dataIdFromObject: o => o.id
} );

export default client;