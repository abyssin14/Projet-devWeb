<?php

namespace App\Form;

use App\Entity\Invite;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;


class InviteType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('presentCeremonie',CheckboxType::class, ['label' => 'Cérémonie'])
            ->add('presentVinDHonneur',CheckboxType::class, ['label' => 'Vin d\'honneur'])
            ->add('presentRepas',CheckboxType::class, ['label' => 'repas'])
            ->add('presentSoiree',CheckboxType::class, ['label' => 'soirée'])
            ->add('allergie')
            ->add('accompagnant',CheckboxType::class, ['label' => 'Serez-vous accompagné ?'])
            ->add('enfant')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Invite::class,
            'translation_domain' => 'forms'
        ]);
    }
}
