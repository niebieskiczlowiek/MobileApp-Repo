import * as React from 'react'
import {View, Text} from 'react-native';

type PkmnDetailsScreenProps = {
    route: any;
    navigation: any,
}

const PkmnDetails: React.FC<PkmnDetailsScreenProps> = ({ route }) => {
    const { name } = route.params
    return (
        <View>
            <Text>
                { name }
            </Text>
        </View>
    )
}

export default PkmnDetails;